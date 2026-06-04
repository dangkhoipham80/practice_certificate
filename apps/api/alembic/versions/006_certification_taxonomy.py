"""certification_domains and certification_topics

Revision ID: 006
Revises: 005
Create Date: 2026-06-04

"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "006"
down_revision: Union[str, Sequence[str], None] = "005"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "certification_domains",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("cert_id", sa.String(length=32), nullable=False),
        sa.Column("slug", sa.String(length=64), nullable=False),
        sa.Column("title", sa.String(length=256), nullable=False),
        sa.Column("sort_order", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("exam_weight_pct", sa.Numeric(5, 2), nullable=True),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default="true"),
        sa.ForeignKeyConstraint(["cert_id"], ["certifications.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("cert_id", "slug", name="uq_cert_domains_cert_slug"),
    )
    op.create_index("ix_certification_domains_cert_id", "certification_domains", ["cert_id"])

    op.create_table(
        "certification_topics",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("cert_id", sa.String(length=32), nullable=False),
        sa.Column("topic_number", sa.String(length=16), nullable=False),
        sa.Column("label", sa.String(length=256), nullable=True),
        sa.Column("primary_domain_slug", sa.String(length=64), nullable=True),
        sa.ForeignKeyConstraint(["cert_id"], ["certifications.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("cert_id", "topic_number", name="uq_cert_topics_cert_number"),
    )
    op.create_index("ix_certification_topics_cert_id", "certification_topics", ["cert_id"])


def downgrade() -> None:
    op.drop_index("ix_certification_topics_cert_id", table_name="certification_topics")
    op.drop_table("certification_topics")
    op.drop_index("ix_certification_domains_cert_id", table_name="certification_domains")
    op.drop_table("certification_domains")
