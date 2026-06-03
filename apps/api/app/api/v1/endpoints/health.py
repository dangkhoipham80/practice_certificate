from datetime import datetime, timezone

from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import get_settings
from app.core.deps import get_db

router = APIRouter(tags=["health"])
settings = get_settings()


@router.get("/health")
async def liveness() -> dict:
    return {
        "ok": True,
        "service": settings.app_name,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@router.get("/health/ready")
async def readiness(db: AsyncSession = Depends(get_db)):
    payload = {
        "service": settings.app_name,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }
    try:
        await db.execute(text("SELECT 1"))
        return {**payload, "ok": True, "database": "connected"}
    except Exception as exc:
        return JSONResponse(
            status_code=503,
            content={**payload, "ok": False, "database": "disconnected", "error": str(exc)},
        )
