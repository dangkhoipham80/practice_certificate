"""question_types table and questions.question_type_id

Revision ID: 005
Revises: 004
Create Date: 2026-06-04

"""

import json
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision: str = "005"
down_revision: Union[str, Sequence[str], None] = "004"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

SEED_TYPES = [
    {
        "slug": "single_choice",
        "label": "Single choice",
        "legacy_kind": "mc",
        "legacy_type": "mc",
        "schema": {"editor": "choices", "correctMode": "single", "quizEligibleDefault": True},
        "sort_order": 10,
    },
    {
        "slug": "multiple_choice",
        "label": "Multiple choice",
        "legacy_kind": "mc",
        "legacy_type": "mc",
        "schema": {"editor": "choices", "correctMode": "multiple", "quizEligibleDefault": True},
        "sort_order": 20,
    },
    {
        "slug": "drag_drop",
        "label": "Drag & drop",
        "legacy_kind": "drag-drop",
        "legacy_type": "interactive",
        "schema": {"editor": "drag_drop", "fields": ["template", "items", "drop_zones", "instructions"]},
        "sort_order": 30,
    },
    {
        "slug": "code_completion",
        "label": "Code completion",
        "legacy_kind": "drag-drop",
        "legacy_type": "interactive",
        "schema": {"editor": "drag_drop", "fields": ["template", "items", "drop_zones", "instructions"]},
        "sort_order": 40,
    },
    {
        "slug": "ordering",
        "label": "Ordering",
        "legacy_kind": "drag-drop",
        "legacy_type": "interactive",
        "schema": {"editor": "drag_drop", "fields": ["template", "items", "drop_zones", "instructions"]},
        "sort_order": 50,
    },
    {
        "slug": "dropdown",
        "label": "Dropdown",
        "legacy_kind": "hotspot",
        "legacy_type": "interactive",
        "schema": {"editor": "hot_area", "fields": ["hotspots", "instructions"]},
        "sort_order": 60,
    },
    {
        "slug": "matching",
        "label": "Matching",
        "legacy_kind": "drag-drop",
        "legacy_type": "interactive",
        "schema": {"editor": "drag_drop", "fields": ["template", "items", "drop_zones", "instructions"]},
        "sort_order": 70,
    },
    {
        "slug": "fill_blank",
        "label": "Fill in the blank",
        "legacy_kind": "other",
        "legacy_type": "interactive",
        "schema": {"editor": "fill_blank", "fields": ["template"]},
        "sort_order": 80,
    },
    {
        "slug": "case_study",
        "label": "Case study / simulation",
        "legacy_kind": "simulation",
        "legacy_type": "interactive",
        "schema": {"editor": "generic", "fields": ["instructions"]},
        "sort_order": 90,
    },
    {
        "slug": "hot_area",
        "label": "Hot area",
        "legacy_kind": "hotspot",
        "legacy_type": "interactive",
        "schema": {"editor": "hot_area", "fields": ["hotspots", "instructions"]},
        "sort_order": 100,
    },
]

KIND_FALLBACK = {
    "mc": "single_choice",
    "drag-drop": "drag_drop",
    "hotspot": "hot_area",
    "simulation": "case_study",
    "other": "drag_drop",
}


def upgrade() -> None:
    op.create_table(
        "question_types",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("slug", sa.String(length=64), nullable=False),
        sa.Column("label", sa.String(length=128), nullable=False),
        sa.Column("legacy_kind", sa.String(length=32), nullable=False, server_default="other"),
        sa.Column("legacy_type", sa.String(length=16), nullable=False, server_default="interactive"),
        sa.Column("schema", postgresql.JSONB(astext_type=sa.Text()), nullable=False, server_default="{}"),
        sa.Column("sort_order", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default="true"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("slug", name="uq_question_types_slug"),
    )
    op.create_index("ix_question_types_slug", "question_types", ["slug"], unique=True)

    conn = op.get_bind()
    for row in SEED_TYPES:
        conn.execute(
            sa.text(
                """
                INSERT INTO question_types (slug, label, legacy_kind, legacy_type, schema, sort_order, is_active)
                VALUES (:slug, :label, :legacy_kind, :legacy_type, CAST(:schema AS jsonb), :sort_order, true)
                """
            ),
            {
                **row,
                "schema": json.dumps(row["schema"]),
            },
        )

    op.add_column("questions", sa.Column("question_type_id", sa.Integer(), nullable=True))
    op.create_foreign_key(
        "fk_questions_question_type_id",
        "questions",
        "question_types",
        ["question_type_id"],
        ["id"],
        ondelete="SET NULL",
    )
    op.create_index("ix_questions_question_type_id", "questions", ["question_type_id"])

    conn.execute(
        sa.text(
            """
            UPDATE questions q
            SET question_type_id = qt.id
            FROM question_types qt
            WHERE q.ui_config->>'type' = qt.slug
            """
        )
    )
    for kind, slug in KIND_FALLBACK.items():
        conn.execute(
            sa.text(
                """
                UPDATE questions q
                SET question_type_id = qt.id
                FROM question_types qt
                WHERE q.question_type_id IS NULL
                  AND q.question_kind = :kind
                  AND qt.slug = :slug
                """
            ),
            {"kind": kind, "slug": slug},
        )


def downgrade() -> None:
    op.drop_constraint("fk_questions_question_type_id", "questions", type_="foreignkey")
    op.drop_index("ix_questions_question_type_id", table_name="questions")
    op.drop_column("questions", "question_type_id")
    op.drop_index("ix_question_types_slug", table_name="question_types")
    op.drop_table("question_types")
