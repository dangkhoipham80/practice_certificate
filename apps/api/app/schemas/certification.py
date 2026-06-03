from pydantic import BaseModel, Field


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

    model_config = {"populate_by_name": True, "from_attributes": True}


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

    model_config = {"populate_by_name": True}
