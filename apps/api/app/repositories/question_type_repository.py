from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.question_type import QuestionType


class QuestionTypeRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def list_all(self, *, active_only: bool = False) -> list[QuestionType]:
        stmt = select(QuestionType).order_by(QuestionType.sort_order, QuestionType.id)
        if active_only:
            stmt = stmt.where(QuestionType.is_active.is_(True))
        result = await self.session.execute(stmt)
        return list(result.scalars().all())

    async def get_by_id(self, type_id: int) -> QuestionType | None:
        result = await self.session.execute(select(QuestionType).where(QuestionType.id == type_id))
        return result.scalar_one_or_none()

    async def get_by_slug(self, slug: str) -> QuestionType | None:
        result = await self.session.execute(select(QuestionType).where(QuestionType.slug == slug))
        return result.scalar_one_or_none()

    async def create(self, **fields) -> QuestionType:
        row = QuestionType(**fields)
        self.session.add(row)
        await self.session.flush()
        await self.session.refresh(row)
        return row

    async def update(self, row: QuestionType, **fields) -> QuestionType:
        for key, value in fields.items():
            setattr(row, key, value)
        await self.session.flush()
        await self.session.refresh(row)
        return row

    async def delete(self, row: QuestionType) -> None:
        await self.session.delete(row)
