from pydantic import BaseModel, Field


class CertificationDomainOut(BaseModel):
    slug: str
    title: str
    sort_order: int = Field(alias="sortOrder")
    exam_weight_pct: float | None = Field(None, alias="examWeightPct")
    is_active: bool = Field(alias="isActive")

    model_config = {"populate_by_name": True, "from_attributes": True}


class CertificationTopicOut(BaseModel):
    topic_number: str = Field(alias="topicNumber")
    label: str | None = None
    primary_domain_slug: str | None = Field(None, alias="primaryDomainSlug")

    model_config = {"populate_by_name": True, "from_attributes": True}


class CertificationTaxonomyOut(BaseModel):
    cert_id: str = Field(alias="certId")
    domains: list[CertificationDomainOut] = []
    topics: list[CertificationTopicOut] = []

    model_config = {"populate_by_name": True}


class CertificationDomainIn(BaseModel):
    slug: str
    title: str
    sort_order: int = Field(alias="sortOrder", default=0)
    exam_weight_pct: float | None = Field(None, alias="examWeightPct")
    is_active: bool = Field(True, alias="isActive")

    model_config = {"populate_by_name": True}


class CertificationTopicIn(BaseModel):
    topic_number: str = Field(alias="topicNumber")
    label: str | None = None
    primary_domain_slug: str | None = Field(None, alias="primaryDomainSlug")

    model_config = {"populate_by_name": True}


class CertificationTaxonomyReplaceIn(BaseModel):
    domains: list[CertificationDomainIn] = []
    topics: list[CertificationTopicIn] = []

    model_config = {"populate_by_name": True}
