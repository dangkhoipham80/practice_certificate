from datetime import date, datetime, timedelta, timezone


def utc_today() -> date:
    return datetime.now(timezone.utc).date()


def activity_date_from_completed_at(completed_at: datetime) -> date:
    if completed_at.tzinfo is None:
        completed_at = completed_at.replace(tzinfo=timezone.utc)
    return completed_at.astimezone(timezone.utc).date()


def compute_day_streak(activity_dates: set[date], *, today: date | None = None) -> int:
    if not activity_dates:
        return 0
    cursor = today or utc_today()
    streak = 0
    while cursor in activity_dates:
        streak += 1
        cursor -= timedelta(days=1)
    return streak
