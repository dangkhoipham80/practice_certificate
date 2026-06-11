import re
from typing import Literal

from pydantic import BaseModel, Field, field_validator

from app.schemas.taxonomy import CertificationDomainOut, CertificationTopicOut


class CertificationOut(BaseModel):
    id: str
    exam_code: str = Field(alias="examCode")
    name: str
    provider: str
    level: str
    description: str
    status: str
    question_count: int = Field(alias="questionCount")
    quiz_eligible_count: int = Field(alias="quizEligibleCount")
    grid_page_size: int = Field(alias="gridPageSize")
    section_mode: str = Field(alias="sectionMode")
    section_label: str = Field(alias="sectionLabel")
    section_badge_prefix: str = Field(alias="sectionBadgePrefix")
    learn_enabled: bool = Field(alias="learnEnabled")
    labs_enabled: bool = Field(alias="labsEnabled")
    learn_content_type: str = Field(alias="learnContentType")
    labs_content_type: str = Field(alias="labsContentType")

    model_config = {"populate_by_name": True, "from_attributes": True}


class CertificationCreateIn(BaseModel):
    id: str = Field(min_length=2, max_length=32)
    exam_code: str = Field(alias="examCode", min_length=2, max_length=32)
    name: str = Field(min_length=1, max_length=128)
    provider: str = Field(default="", max_length=64)
    level: str = Field(default="", max_length=64)
    description: str = ""
    status: str = Field(default="Draft", max_length=32)
    grid_page_size: int = Field(default=50, alias="gridPageSize", ge=10, le=200)
    section_mode: Literal["parts", "domains"] = Field(default="parts", alias="sectionMode")
    section_label: str = Field(default="part", alias="sectionLabel", min_length=1, max_length=32)
    section_badge_prefix: str = Field(default="P", alias="sectionBadgePrefix", min_length=1, max_length=8)
    learn_enabled: bool = Field(default=False, alias="learnEnabled")
    labs_enabled: bool = Field(default=False, alias="labsEnabled")
    learn_content_type: Literal["none", "legacy-knowledge-base", "ai102-guide"] = Field(
        default="none", alias="learnContentType"
    )
    labs_content_type: Literal["none", "ai102-labs"] = Field(default="none", alias="labsContentType")

    model_config = {"populate_by_name": True}

    @field_validator("id")
    @classmethod
    def validate_id(cls, value: str) -> str:
        normalized = value.strip().lower()
        if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", normalized):
            raise ValueError("ID must use lowercase letters, numbers, and single hyphens")
        return normalized

    @field_validator(
        "exam_code",
        "name",
        "provider",
        "level",
        "description",
        "status",
        "section_label",
        "section_badge_prefix",
    )
    @classmethod
    def strip_text(cls, value: str) -> str:
        return value.strip()


class CertificationUpdateIn(BaseModel):
    exam_code: str | None = Field(None, alias="examCode", min_length=2, max_length=32)
    name: str | None = Field(None, min_length=1, max_length=128)
    provider: str | None = Field(None, max_length=64)
    level: str | None = Field(None, max_length=64)
    description: str | None = None
    status: str | None = Field(None, max_length=32)
    grid_page_size: int | None = Field(None, alias="gridPageSize", ge=10, le=200)
    section_mode: Literal["parts", "domains"] | None = Field(None, alias="sectionMode")
    section_label: str | None = Field(None, alias="sectionLabel", min_length=1, max_length=32)
    section_badge_prefix: str | None = Field(None, alias="sectionBadgePrefix", min_length=1, max_length=8)
    learn_enabled: bool | None = Field(None, alias="learnEnabled")
    labs_enabled: bool | None = Field(None, alias="labsEnabled")
    learn_content_type: Literal["none", "legacy-knowledge-base", "ai102-guide"] | None = Field(
        None, alias="learnContentType"
    )
    labs_content_type: Literal["none", "ai102-labs"] | None = Field(None, alias="labsContentType")

    model_config = {"populate_by_name": True}

    @field_validator(
        "exam_code",
        "name",
        "provider",
        "level",
        "description",
        "status",
        "section_label",
        "section_badge_prefix",
    )
    @classmethod
    def strip_optional_text(cls, value: str | None) -> str | None:
        return value.strip() if value is not None else None


class CertificationPartOut(BaseModel):
    sort_order: int = Field(alias="sortOrder")
    domain_id: str | None = Field(None, alias="domainId")
    title: str
    question_count: int = Field(alias="questionCount")
    part_start: int = Field(alias="partStart")

    model_config = {"populate_by_name": True}


class CertificationLayoutOut(BaseModel):
    """Cấu trúc tương thích FE (buildExamParts) — stats tính từ DB."""

    cert_id: str = Field(alias="certId")
    exam_code: str = Field(alias="examCode")
    total: int
    quiz_eligible: int = Field(alias="quizEligible")
    source_files: int = Field(alias="sourceFiles")
    grid_page_size: int = Field(alias="gridPageSize")
    topics: list[str] = []
    part_sizes: list[int] = Field(alias="partSizes")
    part_starts: list[int] = Field(alias="partStarts")
    part_titles: list[str] = Field(alias="partTitles")
    part_domains: list[str] = Field(default_factory=list, alias="partDomains")
    parts: list[CertificationPartOut] = []
    domain_stats: dict | None = Field(None, alias="domainStats")
    domains: list[CertificationDomainOut] = []
    topic_map: list[CertificationTopicOut] = Field(default_factory=list, alias="topicMap")

    model_config = {"populate_by_name": True}
