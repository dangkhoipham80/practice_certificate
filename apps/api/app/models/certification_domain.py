from typing import TYPE_CHECKING

from sqlalchemy import Boolean, ForeignKey, Integer, Numeric, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

if TYPE_CHECKING:
    from app.models.certification import Certification


class CertificationDomain(Base):
    __tablename__ = "certification_domains"
    __table_args__ = (UniqueConstraint("cert_id", "slug", name="uq_cert_domains_cert_slug"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    cert_id: Mapped[str] = mapped_column(
        String(32), ForeignKey("certifications.id", ondelete="CASCADE"), nullable=False, index=True
    )
    slug: Mapped[str] = mapped_column(String(64), nullable=False)
    title: Mapped[str] = mapped_column(String(256), nullable=False)
    sort_order: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    exam_weight_pct: Mapped[float | None] = mapped_column(Numeric(5, 2), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    certification: Mapped["Certification"] = relationship(back_populates="domains")
