from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.auth_deps import require_roles
from app.core.deps import get_db
from app.models.user import User, UserRole
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
from app.services.taxonomy_service import TaxonomyService

router = APIRouter(prefix="/certs", tags=["taxonomy"])


def get_taxonomy_service(db: AsyncSession = Depends(get_db)) -> TaxonomyService:
    return TaxonomyService(CertificationRepository(db), TaxonomyRepository(db))


@router.get("/{cert_id}/taxonomy", response_model=CertificationTaxonomyOut)
async def get_cert_taxonomy(
    cert_id: str,
    service: TaxonomyService = Depends(get_taxonomy_service),
) -> CertificationTaxonomyOut:
    taxonomy = await service.get_taxonomy(cert_id)
    if not taxonomy:
        raise HTTPException(status_code=404, detail=f"Certification '{cert_id}' not found")
    return taxonomy


@router.put("/{cert_id}/taxonomy", response_model=CertificationTaxonomyOut)
async def replace_cert_taxonomy(
    cert_id: str,
    body: CertificationTaxonomyReplaceIn,
    _admin: User = Depends(require_roles(UserRole.admin)),
    service: TaxonomyService = Depends(get_taxonomy_service),
) -> CertificationTaxonomyOut:
    try:
        taxonomy = await service.replace_taxonomy(cert_id, body)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc
    if not taxonomy:
        raise HTTPException(status_code=404, detail=f"Certification '{cert_id}' not found")
    return taxonomy


@router.put("/{cert_id}/taxonomy/domains/{slug}", response_model=CertificationDomainOut)
async def upsert_cert_domain(
    cert_id: str,
    slug: str,
    body: CertificationDomainIn,
    _admin: User = Depends(require_roles(UserRole.admin)),
    service: TaxonomyService = Depends(get_taxonomy_service),
) -> CertificationDomainOut:
    if body.slug != slug:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Slug in path must match body.slug",
        )
    domain = await service.upsert_domain(cert_id, body)
    if not domain:
        raise HTTPException(status_code=404, detail=f"Certification '{cert_id}' not found")
    return domain


@router.put("/{cert_id}/taxonomy/topics/{topic_number}", response_model=CertificationTopicOut)
async def upsert_cert_topic(
    cert_id: str,
    topic_number: str,
    body: CertificationTopicIn,
    _admin: User = Depends(require_roles(UserRole.admin)),
    service: TaxonomyService = Depends(get_taxonomy_service),
) -> CertificationTopicOut:
    if body.topic_number != topic_number:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="topicNumber in path must match body",
        )
    try:
        topic = await service.upsert_topic(cert_id, body)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc
    if not topic:
        raise HTTPException(status_code=404, detail=f"Certification '{cert_id}' not found")
    return topic
