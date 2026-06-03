from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import BigInteger, Boolean, DateTime, ForeignKey, Integer, String, Text, UniqueConstraint, func
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

if TYPE_CHECKING:
    from app.models.certification import Certification


class Question(Base):
    __tablename__ = "questions"
    __table_args__ = (UniqueConstraint("cert_id", "external_id", name="uq_questions_cert_external"),)

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    cert_id: Mapped[str] = mapped_column(
        String(32), ForeignKey("certifications.id", ondelete="CASCADE"), nullable=False, index=True
    )
    external_id: Mapped[int] = mapped_column(Integer, nullable=False)
    sort_order: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    topic: Mapped[str | None] = mapped_column(String(16))
    domain_id: Mapped[str | None] = mapped_column(String(64))
    question_kind: Mapped[str] = mapped_column(String(32), nullable=False, default="mc")
    type: Mapped[str] = mapped_column(String(16), nullable=False, default="mc")
    quiz_eligible: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    text: Mapped[str] = mapped_column(Text, nullable=False)
    choices: Mapped[list] = mapped_column(JSONB, nullable=False, server_default="[]")
    correct: Mapped[list] = mapped_column(JSONB, nullable=False, server_default="[]")
    multiple: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    images: Mapped[list] = mapped_column(JSONB, nullable=False, server_default="[]")
    explanation: Mapped[str | None] = mapped_column(Text)
    warn: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    certification: Mapped["Certification"] = relationship(back_populates="questions")
