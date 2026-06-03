import re
from enum import Enum

from pydantic import BaseModel, EmailStr, Field, field_validator

from app.models.user import UserRole

_EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


class RoleOut(str, Enum):
    student = "student"
    teacher = "teacher"
    admin = "admin"


class RegisterIn(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    display_name: str | None = Field(None, alias="displayName", max_length=128)

    model_config = {"populate_by_name": True}

    @field_validator("email")
    @classmethod
    def normalize_email(cls, v: str) -> str:
        normalized = v.strip().lower()
        if not _EMAIL_RE.match(normalized):
            raise ValueError("Invalid email address")
        return normalized


class LoginIn(BaseModel):
    email: EmailStr
    password: str = Field(max_length=128)

    model_config = {"populate_by_name": True}

    @field_validator("email")
    @classmethod
    def normalize_email(cls, v: str) -> str:
        return v.strip().lower()


class UserOut(BaseModel):
    id: int
    email: str
    role: RoleOut
    display_name: str | None = Field(None, alias="displayName")
    is_active: bool = Field(alias="isActive")

    model_config = {"populate_by_name": True, "from_attributes": True}


class AuthTokenOut(BaseModel):
    access_token: str = Field(serialization_alias="accessToken")
    token_type: str = Field(default="bearer", serialization_alias="tokenType")
    user: UserOut

    model_config = {"populate_by_name": True}


class MessageOut(BaseModel):
    message: str


class UpdateUserRoleIn(BaseModel):
    role: UserRole

    model_config = {"populate_by_name": True}
