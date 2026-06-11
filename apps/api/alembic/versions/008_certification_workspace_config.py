"""certification workspace configuration

Revision ID: 008
Revises: 007
Create Date: 2026-06-11

"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "008"
down_revision: Union[str, Sequence[str], None] = "007"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "certifications",
        sa.Column("section_mode", sa.String(length=16), nullable=False, server_default="parts"),
    )
    op.add_column(
        "certifications",
        sa.Column("section_label", sa.String(length=32), nullable=False, server_default="part"),
    )
    op.add_column(
        "certifications",
        sa.Column("section_badge_prefix", sa.String(length=8), nullable=False, server_default="P"),
    )
    op.add_column(
        "certifications",
        sa.Column("learn_enabled", sa.Boolean(), nullable=False, server_default=sa.false()),
    )
    op.add_column(
        "certifications",
        sa.Column("labs_enabled", sa.Boolean(), nullable=False, server_default=sa.false()),
    )
    op.add_column(
        "certifications",
        sa.Column("learn_content_type", sa.String(length=32), nullable=False, server_default="none"),
    )
    op.add_column(
        "certifications",
        sa.Column("labs_content_type", sa.String(length=32), nullable=False, server_default="none"),
    )

    op.execute(
        """
        UPDATE certifications
        SET section_mode = 'domains',
            section_label = 'domain',
            section_badge_prefix = 'D',
            learn_enabled = true,
            labs_enabled = true,
            learn_content_type = 'ai102-guide',
            labs_content_type = 'ai102-labs'
        WHERE id = 'ai-102'
        """
    )
    op.execute(
        """
        UPDATE certifications
        SET section_mode = 'parts',
            section_label = 'part',
            section_badge_prefix = 'P',
            learn_enabled = true,
            learn_content_type = 'legacy-knowledge-base'
        WHERE id = 'gh-300'
        """
    )


def downgrade() -> None:
    op.drop_column("certifications", "labs_content_type")
    op.drop_column("certifications", "learn_content_type")
    op.drop_column("certifications", "labs_enabled")
    op.drop_column("certifications", "learn_enabled")
    op.drop_column("certifications", "section_badge_prefix")
    op.drop_column("certifications", "section_label")
    op.drop_column("certifications", "section_mode")
