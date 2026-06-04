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
        count = (
            await db.execute(
                text("SELECT COUNT(*)::int FROM information_schema.tables WHERE table_name = 'question_types'")
            )
        ).scalar_one()
        if count < 1:
            return JSONResponse(
                status_code=503,
                content={
                    **payload,
                    "ok": False,
                    "database": "connected",
                    "question_types": "missing",
                    "hint": "Run: npm run db:migrate",
                },
            )
        types = (await db.execute(text("SELECT COUNT(*)::int FROM question_types"))).scalar_one()
        return {**payload, "ok": True, "database": "connected", "question_types": types}
    except Exception as exc:
        return JSONResponse(
            status_code=503,
            content={**payload, "ok": False, "database": "disconnected", "error": str(exc)},
        )
