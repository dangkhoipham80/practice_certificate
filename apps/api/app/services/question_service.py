from app.models.certification_part import CertificationPart
from app.models.question import Question
from app.repositories.certification_repository import CertificationRepository
from app.repositories.question_repository import QuestionRepository
from app.repositories.question_type_repository import QuestionTypeRepository
from app.schemas.certification import (
    CertificationLayoutOut,
    CertificationOut,
    CertificationPartOut,
)
from app.schemas.question import QuestionListOut, QuestionOut, QuestionUpdateIn


def question_to_schema(q: Question) -> QuestionOut:
    qt = q.question_type
    ui = dict(q.ui_config or {})
    if qt and not ui.get("type"):
        ui["type"] = qt.slug
    return QuestionOut(
        topic=q.topic,
        domainId=q.domain_id,
        questionId=q.external_id,
        images=q.images or [],
        explanation=q.explanation,
        quizEligible=q.quiz_eligible,
        type=q.type,
        choices=q.choices or [],
        correct=q.correct or [],
        multiple=q.multiple,
        text=q.text,
        questionKind=q.question_kind,
        warn=q.warn,
        uiConfig=ui,
        questionTypeId=q.question_type_id,
        questionTypeSlug=qt.slug if qt else None,
        questionTypeLabel=qt.label if qt else None,
    )


def parts_with_starts(parts: list[CertificationPart]) -> list[tuple[CertificationPart, int]]:
    start = 0
    result = []
    for part in parts:
        result.append((part, start))
        start += part.question_count
    return result


class QuestionService:
    def __init__(
        self,
        cert_repo: CertificationRepository,
        question_repo: QuestionRepository,
        question_type_repo: QuestionTypeRepository | None = None,
    ) -> None:
        self.cert_repo = cert_repo
        self.question_repo = question_repo
        self.question_type_repo = question_type_repo or QuestionTypeRepository(question_repo.session)

    async def list_certifications(self) -> list[CertificationOut]:
        rows = await self.cert_repo.list_with_counts()
        return [
            CertificationOut(
                id=cert.id,
                examCode=cert.exam_code,
                name=cert.name,
                provider=cert.provider,
                level=cert.level,
                description=cert.description,
                status=cert.status,
                questionCount=total,
                quizEligibleCount=quiz_eligible,
            )
            for cert, total, quiz_eligible in rows
        ]

    async def get_layout(self, cert_id: str) -> CertificationLayoutOut | None:
        cert = await self.cert_repo.get_with_parts(cert_id)
        if not cert:
            return None

        parts = sorted(cert.parts, key=lambda p: p.sort_order)
        parts_indexed = parts_with_starts(parts)
        topics = await self.question_repo.distinct_topics(cert_id)
        domain_stats_raw = await self.question_repo.domain_stats(cert_id)
        domain_stats = domain_stats_raw if domain_stats_raw else None
        total, quiz_eligible = await self.question_repo.count_by_cert(cert_id)

        part_outs = [
            CertificationPartOut(
                sortOrder=part.sort_order,
                domainId=part.domain_id,
                title=part.title,
                questionCount=part.question_count,
                partStart=part_start,
            )
            for part, part_start in parts_indexed
        ]

        part_domains = [p.domain_id for p in parts if p.domain_id]

        return CertificationLayoutOut(
            certId=cert.id,
            examCode=cert.exam_code,
            total=total,
            quizEligible=quiz_eligible,
            sourceFiles=cert.source_file_count,
            gridPageSize=cert.grid_page_size,
            topics=topics,
            partSizes=[p.question_count for p in parts],
            partStarts=[start for _, start in parts_indexed],
            partTitles=[p.title for p in parts],
            partDomains=part_domains,
            parts=part_outs,
            domainStats=domain_stats,
        )

    async def list_questions(
        self,
        cert_id: str,
        *,
        quiz_only: bool = False,
    ) -> QuestionListOut | None:
        cert = await self.cert_repo.get_by_id(cert_id)
        if not cert:
            return None
        questions = await self.question_repo.list_by_cert(cert_id, quiz_only=quiz_only)
        return QuestionListOut(
            certId=cert_id,
            total=len(questions),
            questions=[question_to_schema(q) for q in questions],
        )

    async def update_question(
        self,
        cert_id: str,
        external_id: int,
        body: QuestionUpdateIn,
    ) -> QuestionOut | None:
        cert = await self.cert_repo.get_by_id(cert_id)
        if not cert:
            return None

        question = await self.question_repo.get_by_cert_and_external_id(cert_id, external_id)
        if not question:
            return None

        data = body.model_dump(exclude_unset=True)
        if "choices" in data and data["choices"] is not None:
            data["choices"] = [c.strip() for c in data["choices"] if c and c.strip()]
        if "correct" in data and data["correct"] is not None:
            data["correct"] = sorted(set(data["correct"]))

        choices = data.get("choices", question.choices or [])
        correct = data.get("correct", question.correct or [])
        if choices and correct:
            if any(i < 0 or i >= len(choices) for i in correct):
                raise ValueError("Correct answer indices are out of range")
        if "multiple" not in data and "correct" in data:
            data["multiple"] = len(correct) > 1

        qt = None
        if "question_type_id" in data and data["question_type_id"] is not None:
            qt = await self.question_type_repo.get_by_id(data["question_type_id"])
        elif ui_cfg := data.get("ui_config"):
            slug = ui_cfg.get("type")
            if slug:
                qt = await self.question_type_repo.get_by_slug(slug)
        if qt:
            data["question_type_id"] = qt.id
            data["question_kind"] = qt.legacy_kind
            data["type"] = qt.legacy_type
            if ui_cfg := data.get("ui_config"):
                ui_cfg["type"] = qt.slug

        for key, value in data.items():
            setattr(question, key, value)

        await self.question_repo.session.flush()
        await self.question_repo.session.refresh(question)
        return question_to_schema(question)
