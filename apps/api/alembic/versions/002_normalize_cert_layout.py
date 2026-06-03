"""normalize cert layout: parts table, drop meta blob

Revision ID: 002
Revises: 001
Create Date: 2026-06-03

"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "002"
down_revision: Union[str, Sequence[str], None] = "001"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "certifications",
        sa.Column("grid_page_size", sa.Integer(), nullable=False, server_default="50"),
    )
    op.add_column(
        "certifications",
        sa.Column("source_file_count", sa.Integer(), nullable=False, server_default="0"),
    )

    op.create_table(
        "certification_parts",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("cert_id", sa.String(length=32), nullable=False),
        sa.Column("sort_order", sa.Integer(), nullable=False),
        sa.Column("domain_id", sa.String(length=64), nullable=True),
        sa.Column("title", sa.String(length=256), nullable=False),
        sa.Column("question_count", sa.Integer(), nullable=False, server_default="0"),
        sa.ForeignKeyConstraint(["cert_id"], ["certifications.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("cert_id", "sort_order", name="uq_cert_parts_cert_order"),
    )
    op.create_index("ix_certification_parts_cert_id", "certification_parts", ["cert_id"])

    # Migrate legacy meta JSONB → certification_parts + columns
    op.execute(
        """
        UPDATE certifications SET
          grid_page_size = COALESCE((meta->>'GRID_PAGE_SIZE')::int, 50),
          source_file_count = COALESCE((meta->>'sourceFiles')::int, 0)
        WHERE meta IS NOT NULL AND meta != '{}'::jsonb
        """
    )
    op.execute(
        """
        INSERT INTO certification_parts (cert_id, sort_order, domain_id, title, question_count)
        SELECT
          c.id,
          (s.ordinality - 1)::int,
          CASE
            WHEN c.meta ? 'partDomains'
              AND jsonb_array_length(COALESCE(c.meta->'partDomains', '[]'::jsonb)) > (s.ordinality - 1)
            THEN jsonb_array_element_text(c.meta->'partDomains', (s.ordinality - 1)::int)
            ELSE NULL
          END,
          jsonb_array_element_text(c.meta->'partTitles', (s.ordinality - 1)::int),
          s.elem::int
        FROM certifications c
        CROSS JOIN LATERAL jsonb_array_elements_text(c.meta->'partSizes') WITH ORDINALITY AS s(elem, ordinality)
        WHERE c.meta ? 'partSizes'
          AND jsonb_array_length(c.meta->'partSizes') > 0
        ON CONFLICT (cert_id, sort_order) DO NOTHING
        """
    )

    op.drop_column("certifications", "meta")


def downgrade() -> None:
    op.add_column(
        "certifications",
        sa.Column("meta", sa.dialects.postgresql.JSONB(), server_default="{}", nullable=False),
    )
    op.drop_index("ix_certification_parts_cert_id", table_name="certification_parts")
    op.drop_table("certification_parts")
    op.drop_column("certifications", "source_file_count")
    op.drop_column("certifications", "grid_page_size")
