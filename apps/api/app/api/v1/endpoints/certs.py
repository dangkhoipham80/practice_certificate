from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.auth_deps import require_roles
from app.core.deps import get_db
from app.models.user import User, UserRole
from app.repositories.certification_repository import CertificationRepository
from app.repositories.question_repository import QuestionRepository
from app.repositories.question_type_repository import QuestionTypeRepository
from app.repositories.taxonomy_repository import TaxonomyRepository
from app.schemas.certification import (
    CertificationCreateIn,
    CertificationLayoutOut,
    CertificationOut,
    CertificationUpdateIn,
)
from app.schemas.question import QuestionCreateIn, QuestionListOut, QuestionOut, QuestionUpdateIn
from app.services.question_service import QuestionService

router = APIRouter(prefix="/certs", tags=["certifications"])


def get_question_service(db: AsyncSession = Depends(get_db)) -> QuestionService:
    return QuestionService(
        CertificationRepository(db),
        QuestionRepository(db),
        QuestionTypeRepository(db),
        TaxonomyRepository(db),
    )


@router.get("", response_model=list[CertificationOut])
async def list_certs(service: QuestionService = Depends(get_question_service)) -> list[CertificationOut]:
    return await service.list_certifications()


def cert_to_out(cert, *, question_count: int = 0, quiz_eligible_count: int = 0) -> CertificationOut:
    return CertificationOut(
        id=cert.id,
        examCode=cert.exam_code,
        name=cert.name,
        provider=cert.provider,
        level=cert.level,
        description=cert.description,
        status=cert.status,
        questionCount=question_count,
        quizEligibleCount=quiz_eligible_count,
        gridPageSize=cert.grid_page_size,
        sectionMode=cert.section_mode,
        sectionLabel=cert.section_label,
        sectionBadgePrefix=cert.section_badge_prefix,
        learnEnabled=cert.learn_enabled,
        labsEnabled=cert.labs_enabled,
        learnContentType=cert.learn_content_type,
        labsContentType=cert.labs_content_type,
    )


@router.post("", response_model=CertificationOut, status_code=status.HTTP_201_CREATED)
async def create_cert(
    body: CertificationCreateIn,
    _admin: User = Depends(require_roles(UserRole.admin)),
    db: AsyncSession = Depends(get_db),
) -> CertificationOut:
    repo = CertificationRepository(db)
    if await repo.get_by_id(body.id):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Certification ID already exists")
    cert = await repo.create(**body.model_dump(by_alias=False))
    return cert_to_out(cert)


@router.patch("/{cert_id}", response_model=CertificationOut)
async def update_cert(
    cert_id: str,
    body: CertificationUpdateIn,
    _admin: User = Depends(require_roles(UserRole.admin)),
    db: AsyncSession = Depends(get_db),
) -> CertificationOut:
    repo = CertificationRepository(db)
    cert = await repo.get_by_id(cert_id)
    if not cert:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Certification not found")
    cert = await repo.update(cert, **body.model_dump(exclude_unset=True, by_alias=False))
    total, quiz_eligible = await QuestionRepository(db).count_by_cert(cert_id)
    return cert_to_out(cert, question_count=total, quiz_eligible_count=quiz_eligible)


@router.delete("/{cert_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_cert(
    cert_id: str,
    _admin: User = Depends(require_roles(UserRole.admin)),
    db: AsyncSession = Depends(get_db),
) -> None:
    repo = CertificationRepository(db)
    cert = await repo.get_by_id(cert_id)
    if not cert:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Certification not found")
    await repo.delete(cert)


@router.get("/{cert_id}/layout", response_model=CertificationLayoutOut)
async def get_cert_layout(
    cert_id: str,
    service: QuestionService = Depends(get_question_service),
) -> CertificationLayoutOut:
    layout = await service.get_layout(cert_id)
    if not layout:
        raise HTTPException(status_code=404, detail=f"Certification '{cert_id}' not found")
    return layout


@router.get("/{cert_id}/meta", response_model=CertificationLayoutOut, deprecated=True)
async def get_cert_meta_legacy(
    cert_id: str,
    service: QuestionService = Depends(get_question_service),
) -> CertificationLayoutOut:
    """Alias của /layout — giữ tương thích client cũ."""
    layout = await service.get_layout(cert_id)
    if not layout:
        raise HTTPException(status_code=404, detail=f"Certification '{cert_id}' not found")
    return layout


@router.get("/{cert_id}/questions", response_model=QuestionListOut)
async def get_cert_questions(
    cert_id: str,
    quiz_only: bool = False,
    page: int | None = Query(None, ge=1, description="Page number (1-based). Omit to return all questions."),
    page_size: int = Query(20, ge=1, le=100, alias="pageSize", description="Questions per page when `page` is set."),
    service: QuestionService = Depends(get_question_service),
) -> QuestionListOut:
    result = await service.list_questions(
        cert_id,
        quiz_only=quiz_only,
        page=page,
        page_size=page_size,
    )
    if not result:
        raise HTTPException(status_code=404, detail=f"Certification '{cert_id}' not found")
    return result


@router.post("/{cert_id}/questions", response_model=QuestionOut, status_code=status.HTTP_201_CREATED)
async def create_cert_question(
    cert_id: str,
    body: QuestionCreateIn,
    _admin: User = Depends(require_roles(UserRole.admin)),
    service: QuestionService = Depends(get_question_service),
) -> QuestionOut:
    try:
        created = await service.create_question(cert_id, body)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc
    if not created:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Certification '{cert_id}' not found")
    return created


@router.patch("/{cert_id}/questions/{external_id}", response_model=QuestionOut)
async def update_cert_question(
    cert_id: str,
    external_id: int,
    body: QuestionUpdateIn,
    _admin: User = Depends(require_roles(UserRole.admin)),
    service: QuestionService = Depends(get_question_service),
) -> QuestionOut:
    try:
        updated = await service.update_question(cert_id, external_id, body)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc
    if not updated:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Question {external_id} not found for certification '{cert_id}'",
        )
    return updated


@router.delete("/{cert_id}/questions/{external_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_cert_question(
    cert_id: str,
    external_id: int,
    _admin: User = Depends(require_roles(UserRole.admin)),
    service: QuestionService = Depends(get_question_service),
) -> None:
    deleted = await service.delete_question(cert_id, external_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Question {external_id} not found for certification '{cert_id}'",
        )
