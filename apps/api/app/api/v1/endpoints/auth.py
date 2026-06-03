from fastapi import APIRouter, Depends

from app.core.auth_deps import get_current_user
from app.core.deps import get_db
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.auth import AuthTokenOut, LoginIn, MessageOut, RegisterIn, UserOut
from app.services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["auth"])


def get_auth_service(db=Depends(get_db)) -> AuthService:
    return AuthService(UserRepository(db))


@router.post("/register", response_model=AuthTokenOut, status_code=201)
async def register(body: RegisterIn, service: AuthService = Depends(get_auth_service)) -> AuthTokenOut:
    return await service.register(body)


@router.post("/login", response_model=AuthTokenOut)
async def login(body: LoginIn, service: AuthService = Depends(get_auth_service)) -> AuthTokenOut:
    return await service.login(body.email, body.password)


@router.post("/logout", response_model=MessageOut)
async def logout() -> MessageOut:
    """Stateless JWT: client removes the token."""
    return MessageOut(message="Logged out")


@router.get("/me", response_model=UserOut)
async def me(current_user: User = Depends(get_current_user)) -> UserOut:
    return UserOut.model_validate(current_user)
