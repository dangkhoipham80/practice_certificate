from datetime import datetime

from sqlalchemy import desc, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.quiz_session import QuizSession


class QuizSessionRepository:
    def __init__(self, db: AsyncSession) -> None:
        self._db = db

    async def create(self, session: QuizSession) -> QuizSession:
        self._db.add(session)
        await self._db.flush()
        await self._db.refresh(session)
        return session

    async def get_by_client_id(self, user_id: int, client_id: str) -> QuizSession | None:
        result = await self._db.execute(
            select(QuizSession).where(
                QuizSession.user_id == user_id,
                QuizSession.metadata_.contains({"clientId": client_id}),
            )
        )
        return result.scalar_one_or_none()

    async def list_for_user(
        self,
        user_id: int,
        cert_id: str,
        *,
        limit: int = 80,
    ) -> list[QuizSession]:
        result = await self._db.execute(
            select(QuizSession)
            .where(QuizSession.user_id == user_id, QuizSession.cert_id == cert_id)
            .order_by(desc(QuizSession.completed_at))
            .limit(limit)
        )
        rows = list(result.scalars().all())
        return list(reversed(rows))

    async def list_completed_dates(
        self,
        user_id: int,
        cert_id: str,
        *,
        since: datetime | None = None,
    ) -> list[datetime]:
        stmt = select(QuizSession.completed_at).where(
            QuizSession.user_id == user_id,
            QuizSession.cert_id == cert_id,
        )
        if since is not None:
            stmt = stmt.where(QuizSession.completed_at >= since)
        result = await self._db.execute(stmt.order_by(desc(QuizSession.completed_at)))
        return list(result.scalars().all())
