"""add questions.ui_config

Revision ID: 004
Revises: 003
Create Date: 2026-06-04

"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision: str = "004"
down_revision: Union[str, Sequence[str], None] = "003"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "questions",
        sa.Column("ui_config", postgresql.JSONB(astext_type=sa.Text()), nullable=False, server_default="{}"),
    )


def downgrade() -> None:
    op.drop_column("questions", "ui_config")
