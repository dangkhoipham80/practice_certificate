from datetime import datetime

from pydantic import BaseModel, Field


class SessionRecordIn(BaseModel):
    cert_id: str = Field(alias="certId", min_length=1, max_length=32)
    mode: str = Field(default="practice", max_length=32)
    label: str = Field(min_length=1, max_length=256)
    total: int = Field(ge=1)
    correct: int = Field(ge=0)
    score: int = Field(ge=0, le=100)
    client_id: str = Field(alias="clientId", min_length=1, max_length=64)
    completed_at: datetime | None = Field(None, alias="completedAt")

    model_config = {"populate_by_name": True}


class HistoryRowOut(BaseModel):
    id: str
    label: str
    total: int
    correct: int
    score: int
    date: str

    model_config = {"populate_by_name": True}


class SessionRecordOut(BaseModel):
    session_id: int = Field(alias="sessionId")
    streak: int
    history_row: HistoryRowOut = Field(alias="historyRow")

    model_config = {"populate_by_name": True}


class HistoryOut(BaseModel):
    cert_id: str = Field(alias="certId")
    history: list[HistoryRowOut]

    model_config = {"populate_by_name": True}


class StreakOut(BaseModel):
    cert_id: str = Field(alias="certId")
    streak: int

    model_config = {"populate_by_name": True}


class StreaksOut(BaseModel):
    streaks: dict[str, int]

    model_config = {"populate_by_name": True}


class ImportSessionIn(BaseModel):
    id: str = Field(min_length=1, max_length=64)
    label: str = Field(min_length=1, max_length=256)
    total: int = Field(ge=1)
    correct: int = Field(ge=0)
    score: int = Field(ge=0, le=100)
    date: str = Field(min_length=10, max_length=32)


class ImportIn(BaseModel):
    cert_id: str = Field(alias="certId", min_length=1, max_length=32)
    sessions: list[ImportSessionIn] = Field(default_factory=list)

    model_config = {"populate_by_name": True}


class ImportOut(BaseModel):
    cert_id: str = Field(alias="certId")
    imported: int
    skipped: int
    streak: int

    model_config = {"populate_by_name": True}
