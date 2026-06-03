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

    model_config = {"populate_by_name": True}


class QuestionListOut(BaseModel):
    cert_id: str = Field(alias="certId")
    total: int
    questions: list[QuestionOut]

    model_config = {"populate_by_name": True}
