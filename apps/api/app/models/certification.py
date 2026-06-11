from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, DateTime, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

if TYPE_CHECKING:
    from app.models.certification_domain import CertificationDomain
    from app.models.certification_part import CertificationPart
    from app.models.certification_topic import CertificationTopic
    from app.models.question import Question


class Certification(Base):
    __tablename__ = "certifications"

    id: Mapped[str] = mapped_column(String(32), primary_key=True)
    exam_code: Mapped[str] = mapped_column(String(32), nullable=False)
    name: Mapped[str] = mapped_column(String(128), nullable=False)
    provider: Mapped[str] = mapped_column(String(64), nullable=False, default="")
    level: Mapped[str] = mapped_column(String(64), nullable=False, default="")
    description: Mapped[str] = mapped_column(Text, nullable=False, default="")
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="Ready")
    grid_page_size: Mapped[int] = mapped_column(Integer, nullable=False, default=50)
    source_file_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    section_mode: Mapped[str] = mapped_column(String(16), nullable=False, default="parts")
    section_label: Mapped[str] = mapped_column(String(32), nullable=False, default="part")
    section_badge_prefix: Mapped[str] = mapped_column(String(8), nullable=False, default="P")
    learn_enabled: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    labs_enabled: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    learn_content_type: Mapped[str] = mapped_column(String(32), nullable=False, default="none")
    labs_content_type: Mapped[str] = mapped_column(String(32), nullable=False, default="none")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False
    )

    parts: Mapped[list["CertificationPart"]] = relationship(
        back_populates="certification",
        order_by="CertificationPart.sort_order",
        passive_deletes=True,
    )
    domains: Mapped[list["CertificationDomain"]] = relationship(
        back_populates="certification",
        order_by="CertificationDomain.sort_order",
        passive_deletes=True,
    )
    topics: Mapped[list["CertificationTopic"]] = relationship(
        back_populates="certification",
        order_by="CertificationTopic.topic_number",
        passive_deletes=True,
    )
    questions: Mapped[list["Question"]] = relationship(
        back_populates="certification",
        passive_deletes=True,
    )
