from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User


class UserRepository:
    def __init__(self, db: AsyncSession) -> None:
        self._db = db

    async def get_by_email(self, email: str) -> User | None:
        result = await self._db.execute(select(User).where(User.email == email))
        return result.scalar_one_or_none()

    async def get_by_id(self, user_id: int) -> User | None:
        result = await self._db.execute(select(User).where(User.id == user_id))
        return result.scalar_one_or_none()

    async def count(self) -> int:
        result = await self._db.execute(select(func.count()).select_from(User))
        return int(result.scalar_one())

    async def create(self, user: User) -> User:
        self._db.add(user)
        await self._db.flush()
        await self._db.refresh(user)
        return user

    async def list_all(self) -> list[User]:
        result = await self._db.execute(select(User).order_by(User.id))
        return list(result.scalars().all())

    async def update_role(self, user: User, role: str) -> User:
        user.role = role
        await self._db.flush()
        await self._db.refresh(user)
        return user
