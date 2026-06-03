# Practice Certificate (CertForge)

Ứng dụng luyện thi chứng chỉ — React frontend + FastAPI backend + PostgreSQL.

## Tài liệu

| Tài liệu | Nội dung |
|----------|----------|
| [docs/architecture.md](docs/architecture.md) | Kiến trúc BE–FE |
| [docs/database.md](docs/database.md) | Schema PostgreSQL |
| [docs/migration.md](docs/migration.md) | Migrate câu hỏi vào DB |
| [docs/api.md](docs/api.md) | REST API v1 |
| [docs/data-pipeline.md](docs/data-pipeline.md) | Pipeline nguồn → DB |
| [apps/api/README.md](apps/api/README.md) | Chạy FastAPI |
| [scripts/README.md](scripts/README.md) | Build & migrate scripts |

## Quick start

```bash
# 1. PostgreSQL
docker compose up -d postgres
copy .env.example .env
# Sửa PGPASSWORD và DATABASE_URL

# 2. Python API (venv trong apps/api)
npm run api:install
npm run db:migrate

# 3. Seed questions
npm install
npm run migrate:questions

# 4. Chạy
npm run api      # :8000
npm run dev      # :5173
```

## Scripts chính

- `npm run build:questions` — build `ai102Questions.js`
- `npm run migrate:questions` — đẩy AI-102 + GH-300 vào PostgreSQL
- `npm run db:migrate` — Alembic schema
