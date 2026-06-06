from datetime import datetime, timezone

from fastapi import HTTPException, status

from app.models.quiz_session import QuizSession
from app.models.user import User
from app.repositories.activity_repository import ActivityRepository
from app.repositories.quiz_session_repository import QuizSessionRepository
from app.schemas.progress import (
    HistoryOut,
    HistoryRowOut,
    ImportIn,
    ImportOut,
    SessionRecordIn,
    SessionRecordOut,
    StreakOut,
    StreaksOut,
)
from app.services.streak_service import activity_date_from_completed_at, compute_day_streak


class ProgressService:
    def __init__(
        self,
        sessions: QuizSessionRepository,
        activity: ActivityRepository,
    ) -> None:
        self._sessions = sessions
        self._activity = activity

    async def record_session(self, user: User, body: SessionRecordIn) -> SessionRecordOut:
        existing = await self._sessions.get_by_client_id(user.id, body.client_id)
        if existing:
            streak = await self._streak_for_cert(user.id, body.cert_id)
            return SessionRecordOut(
                session_id=existing.id,
                streak=streak,
                history_row=self._to_history_row(existing),
            )

        completed_at = body.completed_at or datetime.now(timezone.utc)
        if completed_at.tzinfo is None:
            completed_at = completed_at.replace(tzinfo=timezone.utc)

        session = QuizSession(
            user_id=user.id,
            cert_id=body.cert_id,
            mode=body.mode,
            score=body.score,
            total=body.total,
            metadata_={
                "label": body.label,
                "correct": body.correct,
                "clientId": body.client_id,
            },
            completed_at=completed_at,
        )
        session = await self._sessions.create(session)
        await self._activity.record_day(
            user.id,
            body.cert_id,
            activity_date_from_completed_at(completed_at),
        )
        streak = await self._streak_for_cert(user.id, body.cert_id)
        return SessionRecordOut(
            session_id=session.id,
            streak=streak,
            history_row=self._to_history_row(session),
        )

    async def get_history(self, user: User, cert_id: str, *, limit: int = 80) -> HistoryOut:
        rows = await self._sessions.list_for_user(user.id, cert_id, limit=limit)
        return HistoryOut(cert_id=cert_id, history=[self._to_history_row(row) for row in rows])

    async def get_streak(self, user: User, cert_id: str) -> StreakOut:
        streak = await self._streak_for_cert(user.id, cert_id)
        return StreakOut(cert_id=cert_id, streak=streak)

    async def get_streaks(self, user: User) -> StreaksOut:
        cert_ids = await self._activity.list_cert_ids(user.id)
        streaks: dict[str, int] = {}
        for cert_id in cert_ids:
            streaks[cert_id] = await self._streak_for_cert(user.id, cert_id)
        return StreaksOut(streaks=streaks)

    async def import_sessions(self, user: User, body: ImportIn) -> ImportOut:
        imported = 0
        skipped = 0
        for row in body.sessions:
            existing = await self._sessions.get_by_client_id(user.id, row.id)
            if existing:
                skipped += 1
                continue

            try:
                completed_at = datetime.fromisoformat(row.date.replace("Z", "+00:00"))
            except ValueError as exc:
                raise HTTPException(
                    status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                    detail=f"Invalid date for session '{row.id}'",
                ) from exc

            if completed_at.tzinfo is None:
                completed_at = completed_at.replace(tzinfo=timezone.utc)

            session = QuizSession(
                user_id=user.id,
                cert_id=body.cert_id,
                mode="practice",
                score=row.score,
                total=row.total,
                metadata_={
                    "label": row.label,
                    "correct": row.correct,
                    "clientId": row.id,
                },
                completed_at=completed_at,
            )
            await self._sessions.create(session)
            await self._activity.record_day(
                user.id,
                body.cert_id,
                activity_date_from_completed_at(completed_at),
            )
            imported += 1

        streak = await self._streak_for_cert(user.id, body.cert_id)
        return ImportOut(
            cert_id=body.cert_id,
            imported=imported,
            skipped=skipped,
            streak=streak,
        )

    async def _streak_for_cert(self, user_id: int, cert_id: str) -> int:
        dates = await self._activity.get_activity_dates(user_id, cert_id)
        return compute_day_streak(dates)

    @staticmethod
    def _to_history_row(session: QuizSession) -> HistoryRowOut:
        meta = session.metadata_ or {}
        client_id = meta.get("clientId")
        return HistoryRowOut(
            id=str(client_id or session.id),
            label=meta.get("label", "Quiz"),
            total=session.total,
            correct=int(meta.get("correct", 0)),
            score=int(session.score or 0),
            date=session.completed_at.astimezone(timezone.utc).isoformat().replace("+00:00", "Z"),
        )
