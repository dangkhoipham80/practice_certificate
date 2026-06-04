from pydantic import BaseModel, Field


class QuestionTypeOut(BaseModel):
    id: int
    slug: str
    label: str
    legacy_kind: str = Field(alias="legacyKind")
    legacy_type: str = Field(alias="legacyType")
    type_schema: dict = Field(default_factory=dict, serialization_alias="schema")
    sort_order: int = Field(alias="sortOrder")
    is_active: bool = Field(alias="isActive")

    model_config = {"populate_by_name": True, "from_attributes": True}


class QuestionTypeCreateIn(BaseModel):
    slug: str = Field(min_length=1, max_length=64, pattern=r"^[a-z][a-z0-9_]*$")
    label: str = Field(min_length=1, max_length=128)
    legacy_kind: str = Field(default="other", alias="legacyKind", max_length=32)
    legacy_type: str = Field(default="interactive", alias="legacyType", max_length=16)
    type_schema: dict = Field(
        default_factory=dict,
        validation_alias="schema",
        serialization_alias="schema",
    )
    sort_order: int = Field(default=0, alias="sortOrder")
    is_active: bool = Field(default=True, alias="isActive")

    model_config = {"populate_by_name": True}


class QuestionTypeUpdateIn(BaseModel):
    slug: str | None = Field(None, min_length=1, max_length=64, pattern=r"^[a-z][a-z0-9_]*$")
    label: str | None = Field(None, min_length=1, max_length=128)
    legacy_kind: str | None = Field(None, alias="legacyKind", max_length=32)
    legacy_type: str | None = Field(None, alias="legacyType", max_length=16)
    type_schema: dict | None = Field(
        None,
        validation_alias="schema",
        serialization_alias="schema",
    )
    sort_order: int | None = Field(None, alias="sortOrder")
    is_active: bool | None = Field(None, alias="isActive")

    model_config = {"populate_by_name": True}
