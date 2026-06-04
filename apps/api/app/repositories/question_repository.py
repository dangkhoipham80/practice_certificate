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

    async def list_by_cert(
        self,
        cert_id: str,
        *,
        quiz_only: bool = False,
    ) -> list[Question]:
        stmt = (
            select(Question)
            .options(selectinload(Question.question_type))
            .where(Question.cert_id == cert_id)
            .order_by(Question.sort_order)
        )
        if quiz_only:
            stmt = stmt.where(Question.quiz_eligible.is_(True))
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
