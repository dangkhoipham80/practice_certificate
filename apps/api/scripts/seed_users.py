"""
Idempotent dev seed for admin / student / teacher accounts.

Configure in repo root `.env` (see `.env.example`), then:

  npm run seed:users
"""

import asyncio
import sys
from pathlib import Path

_API_ROOT = Path(__file__).resolve().parents[1]
if str(_API_ROOT) not in sys.path:
    sys.path.insert(0, str(_API_ROOT))

from app.core.config import get_settings
from app.core.security import hash_password, verify_password
from app.db.session import async_session_factory
from app.models.user import User, UserRole
from app.repositories.user_repository import UserRepository


def _normalize_email(value: str | None) -> str | None:
    if not value:
        return None
    return value.strip().lower()


def _seed_accounts(settings) -> list[tuple[str, str, str]]:
    required = {
        "SEED_USERS_PASSWORD": settings.seed_users_password,
        "SEED_ADMIN_EMAIL": settings.seed_admin_email,
        "SEED_STUDENT_EMAIL": settings.seed_student_email,
        "SEED_TEACHER_EMAIL": settings.seed_teacher_email,
    }
    missing = [name for name, value in required.items() if not (value and str(value).strip())]
    if missing:
        print("Missing .env values for seed:users:")
        for name in missing:
            print(f"  - {name}")
        sys.exit(1)

    password = settings.seed_users_password.strip()
    if len(password) < 8:
        print("SEED_USERS_PASSWORD must be at least 8 characters.")
        sys.exit(1)

    return [
        (_normalize_email(settings.seed_admin_email), UserRole.admin.value, "Admin"),
        (_normalize_email(settings.seed_student_email), UserRole.student.value, "Student"),
        (_normalize_email(settings.seed_teacher_email), UserRole.teacher.value, "Teacher"),
    ]


async def seed() -> None:
    settings = get_settings()
    accounts = _seed_accounts(settings)
    password = settings.seed_users_password.strip()
    password_hash = hash_password(password)

    async with async_session_factory() as session:
        repo = UserRepository(session)
        created = 0
        updated = 0
        skipped = 0

        for email, role, display_name in accounts:
            existing = await repo.get_by_email(email)
            if existing:
                changed = False
                if existing.role != role:
                    await repo.update_role(existing, role)
                    print(f"  updated role: {email} -> {role}")
                    changed = True
                if not verify_password(password, existing.password_hash):
                    existing.password_hash = password_hash
                    print(f"  updated password: {email}")
                    changed = True
                if not changed:
                    print(f"  unchanged: {email} ({role})")
                    skipped += 1
                else:
                    updated += 1
                continue
            await repo.create(
                User(
                    email=email,
                    password_hash=password_hash,
                    role=role,
                    display_name=display_name,
                )
            )
            print(f"  created: {email} ({role})")
            created += 1
        await session.commit()

    print()
    print(f"Done. created={created}, updated={updated}, unchanged={skipped}")


def main() -> None:
    asyncio.run(seed())


if __name__ == "__main__":
    main()
