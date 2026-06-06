from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.auth_deps import get_current_user
from app.core.deps import get_db
from app.models.user import User
from app.repositories.activity_repository import ActivityRepository
from app.repositories.quiz_session_repository import QuizSessionRepository
from app.schemas.progress import (
    HistoryOut,
    ImportIn,
    ImportOut,
    SessionRecordIn,
    SessionRecordOut,
    StreakOut,
    StreaksOut,
)
from app.services.progress_service import ProgressService

router = APIRouter(prefix="/progress", tags=["progress"])


def get_progress_service(db: AsyncSession = Depends(get_db)) -> ProgressService:
    return ProgressService(QuizSessionRepository(db), ActivityRepository(db))


@router.post("/sessions", response_model=SessionRecordOut, status_code=201)
async def record_session(
    body: SessionRecordIn,
    user: User = Depends(get_current_user),
    service: ProgressService = Depends(get_progress_service),
) -> SessionRecordOut:
    return await service.record_session(user, body)


@router.get("/sessions", response_model=HistoryOut)
async def get_history(
    cert_id: str = Query(..., alias="certId"),
    limit: int = Query(80, ge=1, le=200),
    user: User = Depends(get_current_user),
    service: ProgressService = Depends(get_progress_service),
) -> HistoryOut:
    return await service.get_history(user, cert_id, limit=limit)


@router.get("/streak", response_model=StreakOut)
async def get_streak(
    cert_id: str = Query(..., alias="certId"),
    user: User = Depends(get_current_user),
    service: ProgressService = Depends(get_progress_service),
) -> StreakOut:
    return await service.get_streak(user, cert_id)


@router.get("/streaks", response_model=StreaksOut)
async def get_streaks(
    user: User = Depends(get_current_user),
    service: ProgressService = Depends(get_progress_service),
) -> StreaksOut:
    return await service.get_streaks(user)


@router.post("/import", response_model=ImportOut)
async def import_sessions(
    body: ImportIn,
    user: User = Depends(get_current_user),
    service: ProgressService = Depends(get_progress_service),
) -> ImportOut:
    return await service.import_sessions(user, body)
