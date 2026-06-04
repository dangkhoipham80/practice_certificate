from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.auth_deps import require_roles
from app.core.deps import get_db
from app.models.user import User, UserRole
from app.repositories.question_type_repository import QuestionTypeRepository
from app.schemas.question_type import QuestionTypeCreateIn, QuestionTypeOut, QuestionTypeUpdateIn

router = APIRouter(prefix="/question-types", tags=["question-types"])


def get_repo(db: AsyncSession = Depends(get_db)) -> QuestionTypeRepository:
    return QuestionTypeRepository(db)


@router.get("", response_model=list[QuestionTypeOut])
async def list_question_types(
    repo: QuestionTypeRepository = Depends(get_repo),
) -> list[QuestionTypeOut]:
    rows = await repo.list_all(active_only=True)
    return [QuestionTypeOut.model_validate(r) for r in rows]


@router.get("/manage", response_model=list[QuestionTypeOut])
async def list_question_types_admin(
    _admin: User = Depends(require_roles(UserRole.admin)),
    repo: QuestionTypeRepository = Depends(get_repo),
) -> list[QuestionTypeOut]:
    rows = await repo.list_all(active_only=False)
    return [QuestionTypeOut.model_validate(r) for r in rows]


@router.post("", response_model=QuestionTypeOut, status_code=status.HTTP_201_CREATED)
async def create_question_type(
    body: QuestionTypeCreateIn,
    _admin: User = Depends(require_roles(UserRole.admin)),
    repo: QuestionTypeRepository = Depends(get_repo),
) -> QuestionTypeOut:
    if await repo.get_by_slug(body.slug):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Slug already exists")
    row = await repo.create(**body.model_dump(by_alias=False))
    return QuestionTypeOut.model_validate(row)


@router.patch("/{type_id}", response_model=QuestionTypeOut)
async def update_question_type(
    type_id: int,
    body: QuestionTypeUpdateIn,
    _admin: User = Depends(require_roles(UserRole.admin)),
    repo: QuestionTypeRepository = Depends(get_repo),
) -> QuestionTypeOut:
    row = await repo.get_by_id(type_id)
    if not row:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Question type not found")
    data = body.model_dump(exclude_unset=True, by_alias=False)
    if "slug" in data and data["slug"] != row.slug:
        existing = await repo.get_by_slug(data["slug"])
        if existing:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Slug already exists")
    updated = await repo.update(row, **data)
    return QuestionTypeOut.model_validate(updated)


@router.delete("/{type_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_question_type(
    type_id: int,
    _admin: User = Depends(require_roles(UserRole.admin)),
    repo: QuestionTypeRepository = Depends(get_repo),
) -> None:
    row = await repo.get_by_id(type_id)
    if not row:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Question type not found")
    await repo.update(row, is_active=False)
