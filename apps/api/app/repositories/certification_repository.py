from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.certification import Certification
from app.models.certification_part import CertificationPart
from app.models.question import Question


class CertificationRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def list_with_counts(self) -> list[tuple[Certification, int, int]]:
        stmt = (
            select(
                Certification,
                func.count(Question.id).label("total"),
                func.count(Question.id)
                .filter(Question.quiz_eligible.is_(True))
                .label("quiz_eligible"),
            )
            .outerjoin(Question, Question.cert_id == Certification.id)
            .group_by(Certification.id)
            .order_by(Certification.exam_code)
        )
        result = await self.session.execute(stmt)
        rows = result.all()
        return [(row[0], int(row[1] or 0), int(row[2] or 0)) for row in rows]

    async def get_by_id(self, cert_id: str) -> Certification | None:
        return await self.session.get(Certification, cert_id)

    async def create(self, **fields) -> Certification:
        row = Certification(**fields)
        self.session.add(row)
        await self.session.flush()
        await self.session.refresh(row)
        return row

    async def update(self, row: Certification, **fields) -> Certification:
        for key, value in fields.items():
            setattr(row, key, value)
        await self.session.flush()
        await self.session.refresh(row)
        return row

    async def delete(self, row: Certification) -> None:
        await self.session.delete(row)
        await self.session.flush()

    async def get_with_parts(self, cert_id: str) -> Certification | None:
        stmt = (
            select(Certification)
            .where(Certification.id == cert_id)
            .options(selectinload(Certification.parts))
        )
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def list_parts(self, cert_id: str) -> list[CertificationPart]:
        stmt = (
            select(CertificationPart)
            .where(CertificationPart.cert_id == cert_id)
            .order_by(CertificationPart.sort_order)
        )
        result = await self.session.execute(stmt)
        return list(result.scalars().all())
