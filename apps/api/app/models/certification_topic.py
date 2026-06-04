from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, Integer, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

if TYPE_CHECKING:
    from app.models.certification import Certification


class CertificationTopic(Base):
    __tablename__ = "certification_topics"
    __table_args__ = (UniqueConstraint("cert_id", "topic_number", name="uq_cert_topics_cert_number"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    cert_id: Mapped[str] = mapped_column(
        String(32), ForeignKey("certifications.id", ondelete="CASCADE"), nullable=False, index=True
    )
    topic_number: Mapped[str] = mapped_column(String(16), nullable=False)
    label: Mapped[str | None] = mapped_column(String(256))
    primary_domain_slug: Mapped[str | None] = mapped_column(String(64))

    certification: Mapped["Certification"] = relationship(back_populates="topics")
