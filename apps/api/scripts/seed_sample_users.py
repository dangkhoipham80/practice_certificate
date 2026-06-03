"""
Idempotent dev seed: one account per role (student, teacher, admin).

Run from repo root: npm run seed:users
"""

import asyncio
import sys
from pathlib import Path

# apps/api on path so `app` imports work when invoked via -m
_API_ROOT = Path(__file__).resolve().parents[1]
if str(_API_ROOT) not in sys.path:
    sys.path.insert(0, str(_API_ROOT))

from app.core.security import hash_password
from app.db.session import async_session_factory
from app.models.user import User, UserRole
from app.repositories.user_repository import UserRepository

SAMPLE_PASSWORD = "Sample123!"

SAMPLE_USERS: tuple[tuple[str, str, str, str], ...] = (
    ("student@example.com", UserRole.student.value, "Student Demo", "student"),
    ("teacher@example.com", UserRole.teacher.value, "Teacher Demo", "teacher"),
    ("admin@example.com", UserRole.admin.value, "Admin Demo", "admin"),
)

# Pydantic EmailStr rejects special-use domains such as .local
_LEGACY_EMAILS: dict[str, str] = {
    "student@demo.local": "student@example.com",
    "teacher@demo.local": "teacher@example.com",
    "admin@demo.local": "admin@example.com",
}


async def seed() -> None:
    async with async_session_factory() as session:
        repo = UserRepository(session)
        created = 0
        skipped = 0
        migrated = 0

        for old_email, new_email in _LEGACY_EMAILS.items():
            legacy = await repo.get_by_email(old_email)
            if not legacy:
                continue
            if await repo.get_by_email(new_email):
                print(f"  legacy skipped (target exists): {old_email}")
                continue
            legacy.email = new_email
            print(f"  migrated: {old_email} -> {new_email}")
            migrated += 1

        for email, role, display_name, label in SAMPLE_USERS:
            existing = await repo.get_by_email(email)
            if existing:
                if existing.role != role:
                    await repo.update_role(existing, role)
                    print(f"  updated role: {email} -> {role}")
                else:
                    print(f"  exists: {email} ({label})")
                skipped += 1
                continue
            await repo.create(
                User(
                    email=email,
                    password_hash=hash_password(SAMPLE_PASSWORD),
                    role=role,
                    display_name=display_name,
                )
            )
            print(f"  created: {email} ({label})")
            created += 1
        await session.commit()

    print()
    print(f"Done. created={created}, migrated={migrated}, already_present={skipped}")
    print(f"Password for all sample accounts: {SAMPLE_PASSWORD}")
    print()
    print("| Role    | Email               |")
    print("|---------|---------------------|")
    for email, _, _, label in SAMPLE_USERS:
        print(f"| {label:<7} | {email:<19} |")


def main() -> None:
    asyncio.run(seed())


if __name__ == "__main__":
    main()
