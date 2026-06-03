from app.models.certification_part import CertificationPart
from app.models.question import Question
from app.repositories.certification_repository import CertificationRepository
from app.repositories.question_repository import QuestionRepository
from app.schemas.certification import (
    CertificationLayoutOut,
    CertificationOut,
    CertificationPartOut,
)
from app.schemas.question import QuestionListOut, QuestionOut


def question_to_schema(q: Question) -> QuestionOut:
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
    ) -> None:
        self.cert_repo = cert_repo
        self.question_repo = question_repo

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
