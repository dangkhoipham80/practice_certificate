from datetime import date

from sqlalchemy import distinct, select, text
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user_daily_activity import UserDailyActivity


class ActivityRepository:
    def __init__(self, db: AsyncSession) -> None:
        self._db = db

    async def record_day(self, user_id: int, cert_id: str, activity_date: date) -> None:
        stmt = (
            insert(UserDailyActivity)
            .values(
                user_id=user_id,
                cert_id=cert_id,
                activity_date=activity_date,
                quiz_count=1,
            )
            .on_conflict_do_update(
                constraint="uq_user_daily_activity_user_cert_date",
                set_={"quiz_count": text("user_daily_activity.quiz_count + 1")},
            )
        )
        await self._db.execute(stmt)

    async def get_activity_dates(self, user_id: int, cert_id: str) -> set[date]:
        result = await self._db.execute(
            select(UserDailyActivity.activity_date).where(
                UserDailyActivity.user_id == user_id,
                UserDailyActivity.cert_id == cert_id,
            )
        )
        return set(result.scalars().all())

    async def list_cert_ids(self, user_id: int) -> list[str]:
        result = await self._db.execute(
            select(distinct(UserDailyActivity.cert_id))
            .where(UserDailyActivity.user_id == user_id)
            .order_by(UserDailyActivity.cert_id)
        )
        return list(result.scalars().all())
