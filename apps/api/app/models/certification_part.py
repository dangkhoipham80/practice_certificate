from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, Integer, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

if TYPE_CHECKING:
    from app.models.certification import Certification


class CertificationPart(Base):
    __tablename__ = "certification_parts"
    __table_args__ = (UniqueConstraint("cert_id", "sort_order", name="uq_cert_parts_cert_order"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    cert_id: Mapped[str] = mapped_column(
        String(32), ForeignKey("certifications.id", ondelete="CASCADE"), nullable=False, index=True
    )
    sort_order: Mapped[int] = mapped_column(Integer, nullable=False)
    domain_id: Mapped[str | None] = mapped_column(String(64))
    title: Mapped[str] = mapped_column(String(256), nullable=False)
    question_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)

    certification: Mapped["Certification"] = relationship(back_populates="parts")
