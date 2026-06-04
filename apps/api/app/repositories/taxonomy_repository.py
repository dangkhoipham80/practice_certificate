from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.certification_domain import CertificationDomain
from app.models.certification_topic import CertificationTopic


class TaxonomyRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def list_domains(self, cert_id: str) -> list[CertificationDomain]:
        stmt = (
            select(CertificationDomain)
            .where(CertificationDomain.cert_id == cert_id)
            .order_by(CertificationDomain.sort_order)
        )
        result = await self.session.execute(stmt)
        return list(result.scalars().all())

    async def list_topics(self, cert_id: str) -> list[CertificationTopic]:
        stmt = (
            select(CertificationTopic)
            .where(CertificationTopic.cert_id == cert_id)
            .order_by(CertificationTopic.topic_number)
        )
        result = await self.session.execute(stmt)
        return list(result.scalars().all())

    async def get_domain(self, cert_id: str, slug: str) -> CertificationDomain | None:
        stmt = select(CertificationDomain).where(
            CertificationDomain.cert_id == cert_id,
            CertificationDomain.slug == slug,
        )
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def get_topic(self, cert_id: str, topic_number: str) -> CertificationTopic | None:
        stmt = select(CertificationTopic).where(
            CertificationTopic.cert_id == cert_id,
            CertificationTopic.topic_number == topic_number,
        )
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def replace_domains(self, cert_id: str, rows: list[dict]) -> None:
        await self.session.execute(
            delete(CertificationDomain).where(CertificationDomain.cert_id == cert_id)
        )
        for row in rows:
            self.session.add(
                CertificationDomain(
                    cert_id=cert_id,
                    slug=row["slug"],
                    title=row["title"],
                    sort_order=row["sort_order"],
                    exam_weight_pct=row.get("exam_weight_pct"),
                    is_active=row.get("is_active", True),
                )
            )

    async def replace_topics(self, cert_id: str, rows: list[dict]) -> None:
        await self.session.execute(
            delete(CertificationTopic).where(CertificationTopic.cert_id == cert_id)
        )
        for row in rows:
            self.session.add(
                CertificationTopic(
                    cert_id=cert_id,
                    topic_number=row["topic_number"],
                    label=row.get("label"),
                    primary_domain_slug=row.get("primary_domain_slug"),
                )
            )

    async def upsert_domain(self, cert_id: str, data: dict) -> CertificationDomain:
        existing = await self.get_domain(cert_id, data["slug"])
        if existing:
            existing.title = data["title"]
            existing.sort_order = data["sort_order"]
            existing.exam_weight_pct = data.get("exam_weight_pct")
            existing.is_active = data.get("is_active", True)
            await self.session.flush()
            return existing

        domain = CertificationDomain(cert_id=cert_id, **data)
        self.session.add(domain)
        await self.session.flush()
        return domain

    async def upsert_topic(self, cert_id: str, data: dict) -> CertificationTopic:
        existing = await self.get_topic(cert_id, data["topic_number"])
        if existing:
            existing.label = data.get("label")
            existing.primary_domain_slug = data.get("primary_domain_slug")
            await self.session.flush()
            return existing

        topic = CertificationTopic(cert_id=cert_id, **data)
        self.session.add(topic)
        await self.session.flush()
        return topic
