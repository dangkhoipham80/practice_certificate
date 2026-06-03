from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.deps import get_db
from app.repositories.certification_repository import CertificationRepository
from app.repositories.question_repository import QuestionRepository
from app.schemas.certification import CertificationLayoutOut, CertificationOut
from app.schemas.question import QuestionListOut
from app.services.question_service import QuestionService

router = APIRouter(prefix="/certs", tags=["certifications"])


def get_question_service(db: AsyncSession = Depends(get_db)) -> QuestionService:
    return QuestionService(CertificationRepository(db), QuestionRepository(db))


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
