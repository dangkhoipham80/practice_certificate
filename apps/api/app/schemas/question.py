from pydantic import BaseModel, Field


class QuestionOut(BaseModel):
    topic: str | None = None
    domain_id: str | None = Field(None, alias="domainId")
    question_id: int = Field(alias="questionId")
    images: list[str] = []
    explanation: str | None = None
    quiz_eligible: bool = Field(alias="quizEligible")
    type: str
    choices: list[str] = []
    correct: list[int] = []
    multiple: bool = False
    text: str
    question_kind: str = Field(alias="questionKind")
    warn: str | None = None
    ui_config: dict = Field(default_factory=dict, alias="uiConfig")
    question_type_id: int | None = Field(None, alias="questionTypeId")
    question_type_slug: str | None = Field(None, alias="questionTypeSlug")
    question_type_label: str | None = Field(None, alias="questionTypeLabel")

    model_config = {"populate_by_name": True}


class QuestionListOut(BaseModel):
    cert_id: str = Field(alias="certId")
    total: int
    questions: list[QuestionOut]
    page: int | None = None
    page_size: int | None = Field(None, alias="pageSize")
    total_pages: int | None = Field(None, alias="totalPages")

    model_config = {"populate_by_name": True}


class QuestionCreateIn(BaseModel):
    text: str = Field(..., min_length=1)
    choices: list[str] | None = None
    correct: list[int] | None = None
    multiple: bool | None = None
    explanation: str | None = None
    quiz_eligible: bool | None = Field(None, alias="quizEligible")
    domain_id: str | None = Field(None, alias="domainId")
    topic: str | None = None
    images: list[str] | None = None
    warn: str | None = None
    ui_config: dict | None = Field(None, alias="uiConfig")
    question_type_id: int | None = Field(None, alias="questionTypeId")

    model_config = {"populate_by_name": True}


class QuestionUpdateIn(BaseModel):
    text: str | None = Field(None, min_length=1)
    choices: list[str] | None = None
    correct: list[int] | None = None
    multiple: bool | None = None
    explanation: str | None = None
    quiz_eligible: bool | None = Field(None, alias="quizEligible")
    domain_id: str | None = Field(None, alias="domainId")
    topic: str | None = None
    images: list[str] | None = None
    warn: str | None = None
    ui_config: dict | None = Field(None, alias="uiConfig")
    question_type_id: int | None = Field(None, alias="questionTypeId")

    model_config = {"populate_by_name": True}
