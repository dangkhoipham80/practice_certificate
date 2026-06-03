"""add users and auth

Revision ID: 003
Revises: 002
Create Date: 2026-06-03

"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "003"
down_revision: Union[str, Sequence[str], None] = "002"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("email", sa.String(length=320), nullable=False),
        sa.Column("password_hash", sa.String(length=255), nullable=False),
        sa.Column("role", sa.String(length=16), server_default="student", nullable=False),
        sa.Column("display_name", sa.String(length=128), nullable=True),
        sa.Column("is_active", sa.Boolean(), server_default="true", nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("email"),
    )
    op.create_index("ix_users_email", "users", ["email"], unique=True)
    op.create_index("ix_users_role", "users", ["role"])

    op.add_column("quiz_sessions", sa.Column("user_id", sa.Integer(), nullable=True))
    op.create_foreign_key(
        "fk_quiz_sessions_user_id",
        "quiz_sessions",
        "users",
        ["user_id"],
        ["id"],
        ondelete="SET NULL",
    )
    op.create_index("ix_quiz_sessions_user_id", "quiz_sessions", ["user_id"])


def downgrade() -> None:
    op.drop_index("ix_quiz_sessions_user_id", table_name="quiz_sessions")
    op.drop_constraint("fk_quiz_sessions_user_id", "quiz_sessions", type_="foreignkey")
    op.drop_column("quiz_sessions", "user_id")
    op.drop_index("ix_users_role", table_name="users")
    op.drop_index("ix_users_email", table_name="users")
    op.drop_table("users")
