"""initial schema

Revision ID: 001
Revises:
Create Date: 2026-06-03

"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision: str = "001"
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "certifications",
        sa.Column("id", sa.String(length=32), nullable=False),
        sa.Column("exam_code", sa.String(length=32), nullable=False),
        sa.Column("name", sa.String(length=128), nullable=False),
        sa.Column("provider", sa.String(length=64), nullable=False, server_default=""),
        sa.Column("level", sa.String(length=64), nullable=False, server_default=""),
        sa.Column("description", sa.Text(), nullable=False, server_default=""),
        sa.Column("status", sa.String(length=32), nullable=False, server_default="Ready"),
        sa.Column("meta", postgresql.JSONB(astext_type=sa.Text()), server_default="{}", nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_table(
        "questions",
        sa.Column("id", sa.BigInteger(), autoincrement=True, nullable=False),
        sa.Column("cert_id", sa.String(length=32), nullable=False),
        sa.Column("external_id", sa.Integer(), nullable=False),
        sa.Column("sort_order", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("topic", sa.String(length=16), nullable=True),
        sa.Column("domain_id", sa.String(length=64), nullable=True),
        sa.Column("question_kind", sa.String(length=32), nullable=False, server_default="mc"),
        sa.Column("type", sa.String(length=16), nullable=False, server_default="mc"),
        sa.Column("quiz_eligible", sa.Boolean(), nullable=False, server_default="false"),
        sa.Column("text", sa.Text(), nullable=False),
        sa.Column("choices", postgresql.JSONB(astext_type=sa.Text()), server_default="[]", nullable=False),
        sa.Column("correct", postgresql.JSONB(astext_type=sa.Text()), server_default="[]", nullable=False),
        sa.Column("multiple", sa.Boolean(), nullable=False, server_default="false"),
        sa.Column("images", postgresql.JSONB(astext_type=sa.Text()), server_default="[]", nullable=False),
        sa.Column("explanation", sa.Text(), nullable=True),
        sa.Column("warn", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.ForeignKeyConstraint(["cert_id"], ["certifications.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("cert_id", "external_id", name="uq_questions_cert_external"),
    )
    op.create_index("ix_questions_cert_id", "questions", ["cert_id"])

    op.create_table(
        "quiz_sessions",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("cert_id", sa.String(length=32), nullable=False),
        sa.Column("mode", sa.String(length=32), nullable=False, server_default="practice"),
        sa.Column("score", sa.Integer(), nullable=True),
        sa.Column("total", sa.Integer(), nullable=False),
        sa.Column("metadata", postgresql.JSONB(astext_type=sa.Text()), server_default="{}", nullable=False),
        sa.Column("completed_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.ForeignKeyConstraint(["cert_id"], ["certifications.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_quiz_sessions_cert_id", "quiz_sessions", ["cert_id"])
    op.create_index(
        "idx_quiz_sessions_cert_completed",
        "quiz_sessions",
        ["cert_id", "completed_at"],
        postgresql_ops={"completed_at": "DESC"},
    )


def downgrade() -> None:
    op.drop_index("idx_quiz_sessions_cert_completed", table_name="quiz_sessions")
    op.drop_index("ix_quiz_sessions_cert_id", table_name="quiz_sessions")
    op.drop_table("quiz_sessions")
    op.drop_index("ix_questions_cert_id", table_name="questions")
    op.drop_table("questions")
    op.drop_table("certifications")
