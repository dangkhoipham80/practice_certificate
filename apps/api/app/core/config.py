from functools import lru_cache
from pathlib import Path

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


def _repo_root() -> Path:
    here = Path(__file__).resolve()
    for parent in here.parents:
        if (parent / "package.json").is_file() and (parent / ".env.example").is_file():
            return parent
    raise RuntimeError("Repository root not found (expected package.json + .env.example)")


_REPO_ROOT = _repo_root()
_ENV_FILE = _REPO_ROOT / ".env"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=str(_ENV_FILE) if _ENV_FILE.is_file() else None,
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str = Field(default="practice-certificate-api", validation_alias="APP_NAME")
    debug: bool = Field(default=False, validation_alias="DEBUG")

    database_url: str = Field(validation_alias="DATABASE_URL")
    cors_origins: str = Field(validation_alias="CORS_ORIGINS")

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    if not _ENV_FILE.is_file():
        raise RuntimeError(f"Missing .env at {_ENV_FILE}. Copy from .env.example.")
    return Settings()
