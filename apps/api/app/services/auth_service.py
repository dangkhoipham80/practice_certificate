from fastapi import HTTPException, status

from app.core.config import get_settings
from app.core.security import create_access_token, hash_password, verify_password
from app.models.user import User, UserRole
from app.repositories.user_repository import UserRepository
from app.schemas.auth import AuthTokenOut, RegisterIn, UserOut


class AuthService:
    INVALID_CREDENTIALS = "Invalid email or password"

    def __init__(self, users: UserRepository) -> None:
        self._users = users

    async def register(self, body: RegisterIn) -> AuthTokenOut:
        existing = await self._users.get_by_email(body.email)
        if existing:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")

        settings = get_settings()
        role = UserRole.student.value
        if settings.bootstrap_admin_email:
            bootstrap = settings.bootstrap_admin_email.strip().lower()
            if body.email == bootstrap and await self._users.count() == 0:
                role = UserRole.admin.value

        user = User(
            email=body.email,
            password_hash=hash_password(body.password),
            role=role,
            display_name=body.display_name,
        )
        user = await self._users.create(user)
        return self._token_response(user)

    async def login(self, email: str, password: str) -> AuthTokenOut:
        user = await self._users.get_by_email(email)
        if not user or not verify_password(password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=self.INVALID_CREDENTIALS,
            )
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Account is disabled",
            )
        return self._token_response(user)

    def _token_response(self, user: User) -> AuthTokenOut:
        token = create_access_token(user_id=user.id, role=user.role)
        return AuthTokenOut(
            access_token=token,
            user=UserOut.model_validate(user),
        )
