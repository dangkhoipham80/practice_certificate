from app.repositories.certification_repository import CertificationRepository
from app.repositories.taxonomy_repository import TaxonomyRepository
from app.schemas.taxonomy import (
    CertificationDomainIn,
    CertificationDomainOut,
    CertificationTaxonomyOut,
    CertificationTaxonomyReplaceIn,
    CertificationTopicIn,
    CertificationTopicOut,
)


class TaxonomyService:
    def __init__(
        self,
        cert_repo: CertificationRepository,
        taxonomy_repo: TaxonomyRepository,
    ) -> None:
        self.cert_repo = cert_repo
        self.taxonomy_repo = taxonomy_repo

    async def get_taxonomy(self, cert_id: str) -> CertificationTaxonomyOut | None:
        cert = await self.cert_repo.get_by_id(cert_id)
        if not cert:
            return None

        domains = await self.taxonomy_repo.list_domains(cert_id)
        topics = await self.taxonomy_repo.list_topics(cert_id)
        return CertificationTaxonomyOut(
            certId=cert_id,
            domains=[
                CertificationDomainOut(
                    slug=d.slug,
                    title=d.title,
                    sortOrder=d.sort_order,
                    examWeightPct=float(d.exam_weight_pct) if d.exam_weight_pct is not None else None,
                    isActive=d.is_active,
                )
                for d in domains
            ],
            topics=[
                CertificationTopicOut(
                    topicNumber=t.topic_number,
                    label=t.label,
                    primaryDomainSlug=t.primary_domain_slug,
                )
                for t in topics
            ],
        )

    async def replace_taxonomy(
        self, cert_id: str, body: CertificationTaxonomyReplaceIn
    ) -> CertificationTaxonomyOut | None:
        cert = await self.cert_repo.get_by_id(cert_id)
        if not cert:
            return None

        domain_slugs = {d.slug for d in body.domains}
        for topic in body.topics:
            if topic.primary_domain_slug and topic.primary_domain_slug not in domain_slugs:
                raise ValueError(
                    f"Topic {topic.topic_number} references unknown domain "
                    f"'{topic.primary_domain_slug}'"
                )

        await self.taxonomy_repo.replace_domains(
            cert_id,
            [
                {
                    "slug": d.slug,
                    "title": d.title,
                    "sort_order": d.sort_order,
                    "exam_weight_pct": d.exam_weight_pct,
                    "is_active": d.is_active,
                }
                for d in body.domains
            ],
        )
        await self.taxonomy_repo.replace_topics(
            cert_id,
            [
                {
                    "topic_number": t.topic_number,
                    "label": t.label,
                    "primary_domain_slug": t.primary_domain_slug,
                }
                for t in body.topics
            ],
        )
        return await self.get_taxonomy(cert_id)

    async def upsert_domain(
        self, cert_id: str, body: CertificationDomainIn
    ) -> CertificationDomainOut | None:
        cert = await self.cert_repo.get_by_id(cert_id)
        if not cert:
            return None

        row = await self.taxonomy_repo.upsert_domain(
            cert_id,
            {
                "slug": body.slug,
                "title": body.title,
                "sort_order": body.sort_order,
                "exam_weight_pct": body.exam_weight_pct,
                "is_active": body.is_active,
            },
        )
        return CertificationDomainOut(
            slug=row.slug,
            title=row.title,
            sortOrder=row.sort_order,
            examWeightPct=float(row.exam_weight_pct) if row.exam_weight_pct is not None else None,
            isActive=row.is_active,
        )

    async def upsert_topic(
        self, cert_id: str, body: CertificationTopicIn
    ) -> CertificationTopicOut | None:
        cert = await self.cert_repo.get_by_id(cert_id)
        if not cert:
            return None

        if body.primary_domain_slug:
            domain = await self.taxonomy_repo.get_domain(cert_id, body.primary_domain_slug)
            if not domain:
                raise ValueError(f"Unknown domain '{body.primary_domain_slug}'")

        row = await self.taxonomy_repo.upsert_topic(
            cert_id,
            {
                "topic_number": body.topic_number,
                "label": body.label,
                "primary_domain_slug": body.primary_domain_slug,
            },
        )
        return CertificationTopicOut(
            topicNumber=row.topic_number,
            label=row.label,
            primaryDomainSlug=row.primary_domain_slug,
        )

    def domain_label_map(self, domains: list) -> dict[str, str]:
        return {d.slug: d.title for d in domains}
