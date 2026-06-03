from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.auth_deps import require_roles
from app.core.deps import get_db
from app.models.user import User, UserRole
from app.repositories.user_repository import UserRepository
from app.schemas.auth import UpdateUserRoleIn, UserOut

router = APIRouter(prefix="/users", tags=["users"])


@router.get("", response_model=list[UserOut])
async def list_users(
    _admin: User = Depends(require_roles(UserRole.admin)),
    db: AsyncSession = Depends(get_db),
) -> list[UserOut]:
    users = await UserRepository(db).list_all()
    return [UserOut.model_validate(u) for u in users]


@router.patch("/{user_id}/role", response_model=UserOut)
async def update_user_role(
    user_id: int,
    body: UpdateUserRoleIn,
    current: User = Depends(require_roles(UserRole.admin)),
    db: AsyncSession = Depends(get_db),
) -> UserOut:
    repo = UserRepository(db)
    target = await repo.get_by_id(user_id)
    if not target:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    if target.id == current.id and body.role != UserRole.admin:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot remove your own admin role",
        )
    updated = await repo.update_role(target, body.role.value)
    return UserOut.model_validate(updated)
