"""user_daily_activity for streak tracking

Revision ID: 007
Revises: 006
Create Date: 2026-06-06

"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "007"
down_revision: Union[str, Sequence[str], None] = "006"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "user_daily_activity",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("cert_id", sa.String(length=32), nullable=False),
        sa.Column("activity_date", sa.Date(), nullable=False),
        sa.Column("quiz_count", sa.Integer(), nullable=False, server_default="1"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["cert_id"], ["certifications.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("user_id", "cert_id", "activity_date", name="uq_user_daily_activity_user_cert_date"),
    )
    op.create_index(
        "ix_user_daily_activity_user_cert_date",
        "user_daily_activity",
        ["user_id", "cert_id", sa.text("activity_date DESC")],
    )

    op.create_index(
        "ix_quiz_sessions_user_cert_completed",
        "quiz_sessions",
        ["user_id", "cert_id", sa.text("completed_at DESC")],
    )


def downgrade() -> None:
    op.drop_index("ix_quiz_sessions_user_cert_completed", table_name="quiz_sessions")
    op.drop_index("ix_user_daily_activity_user_cert_date", table_name="user_daily_activity")
    op.drop_table("user_daily_activity")
