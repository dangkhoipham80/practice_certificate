from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.auth_deps import require_roles
from app.core.deps import get_db
from app.models.user import User, UserRole
from app.repositories.certification_repository import CertificationRepository
from app.repositories.question_repository import QuestionRepository
from app.repositories.question_type_repository import QuestionTypeRepository
from app.schemas.certification import CertificationLayoutOut, CertificationOut
from app.schemas.question import QuestionListOut, QuestionOut, QuestionUpdateIn
from app.services.question_service import QuestionService

router = APIRouter(prefix="/certs", tags=["certifications"])


def get_question_service(db: AsyncSession = Depends(get_db)) -> QuestionService:
    return QuestionService(
        CertificationRepository(db),
        QuestionRepository(db),
        QuestionTypeRepository(db),
    )


@router.get("", response_model=list[CertificationOut])
async def list_certs(service: QuestionService = Depends(get_question_service)) -> list[CertificationOut]:
    return await service.list_certifications()


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
    service: QuestionService = Depends(get_question_service),
) -> QuestionListOut:
    result = await service.list_questions(cert_id, quiz_only=quiz_only)
    if not result:
        raise HTTPException(status_code=404, detail=f"Certification '{cert_id}' not found")
    return result


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
