from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.question import Question


class QuestionRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def count_by_cert(self, cert_id: str) -> tuple[int, int]:
        stmt = select(
            func.count(Question.id).label("total"),
            func.count(Question.id).filter(Question.quiz_eligible.is_(True)).label("quiz_eligible"),
        ).where(Question.cert_id == cert_id)
        result = await self.session.execute(stmt)
        row = result.one()
        return int(row.total or 0), int(row.quiz_eligible or 0)

    def _list_by_cert_stmt(self, cert_id: str, *, quiz_only: bool = False):
        stmt = (
            select(Question)
            .options(selectinload(Question.question_type))
            .where(Question.cert_id == cert_id)
            .order_by(Question.sort_order)
        )
        if quiz_only:
            stmt = stmt.where(Question.quiz_eligible.is_(True))
        return stmt

    async def count_list_by_cert(self, cert_id: str, *, quiz_only: bool = False) -> int:
        stmt = select(func.count(Question.id)).where(Question.cert_id == cert_id)
        if quiz_only:
            stmt = stmt.where(Question.quiz_eligible.is_(True))
        result = await self.session.execute(stmt)
        return int(result.scalar_one() or 0)

    async def list_by_cert(
        self,
        cert_id: str,
        *,
        quiz_only: bool = False,
        offset: int = 0,
        limit: int | None = None,
    ) -> list[Question]:
        stmt = self._list_by_cert_stmt(cert_id, quiz_only=quiz_only)
        if limit is not None:
            stmt = stmt.offset(offset).limit(limit)
        result = await self.session.execute(stmt)
        return list(result.scalars().all())

    async def distinct_topics(self, cert_id: str) -> list[str]:
        stmt = (
            select(Question.topic)
            .where(Question.cert_id == cert_id, Question.topic.isnot(None))
            .distinct()
            .order_by(Question.topic)
        )
        result = await self.session.execute(stmt)
        return [row[0] for row in result.all() if row[0]]

    async def domain_stats(self, cert_id: str) -> dict:
        stmt = (
            select(
                Question.domain_id,
                Question.topic,
                func.count(Question.id).label("total"),
                func.count(Question.id)
                .filter(Question.quiz_eligible.is_(True))
                .label("quiz_eligible"),
            )
            .where(Question.cert_id == cert_id, Question.domain_id.isnot(None))
            .group_by(Question.domain_id, Question.topic)
        )
        result = await self.session.execute(stmt)
        stats: dict = {}
        for domain_id, topic, total, quiz_eligible in result.all():
            if domain_id not in stats:
                stats[domain_id] = {"total": 0, "quizEligible": 0, "examTopics": {}}
            stats[domain_id]["total"] += int(total)
            stats[domain_id]["quizEligible"] += int(quiz_eligible)
            if topic:
                stats[domain_id]["examTopics"][topic] = (
                    stats[domain_id]["examTopics"].get(topic, 0) + int(total)
                )
        return stats

    async def get_by_cert_and_external_id(self, cert_id: str, external_id: int) -> Question | None:
        stmt = (
            select(Question)
            .options(selectinload(Question.question_type))
            .where(Question.cert_id == cert_id, Question.external_id == external_id)
        )
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def max_external_id(self, cert_id: str) -> int:
        stmt = select(func.coalesce(func.max(Question.external_id), 0)).where(Question.cert_id == cert_id)
        result = await self.session.execute(stmt)
        return int(result.scalar_one() or 0)

    async def max_sort_order(self, cert_id: str) -> int:
        stmt = select(func.coalesce(func.max(Question.sort_order), -1)).where(Question.cert_id == cert_id)
        result = await self.session.execute(stmt)
        return int(result.scalar_one() or -1)

    async def create(self, question: Question) -> Question:
        self.session.add(question)
        await self.session.flush()
        await self.session.refresh(question)
        stmt = (
            select(Question)
            .options(selectinload(Question.question_type))
            .where(Question.id == question.id)
        )
        result = await self.session.execute(stmt)
        return result.scalar_one()

    async def delete_by_cert_and_external_id(self, cert_id: str, external_id: int) -> bool:
        question = await self.get_by_cert_and_external_id(cert_id, external_id)
        if not question:
            return False
        await self.session.delete(question)
        await self.session.flush()
        return True
