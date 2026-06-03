# Practice Certificate (CertForge)

Ứng dụng luyện thi chứng chỉ — monorepo: `apps/web` (FE) + `apps/api` (BE) + PostgreSQL.

## Tài liệu

| Tài liệu | Nội dung |
|----------|----------|
| [docs/architecture.md](docs/architecture.md) | Kiến trúc BE–FE |
| [docs/database.md](docs/database.md) | Schema PostgreSQL |
| [docs/migration.md](docs/migration.md) | Migrate câu hỏi vào DB |
| [docs/api.md](docs/api.md) | REST API v1 |
| [docs/auth.md](docs/auth.md) | Auth & RBAC (student / teacher / admin) |
| [docs/data-pipeline.md](docs/data-pipeline.md) | Pipeline nguồn → DB |
| [apps/api/README.md](apps/api/README.md) | Chạy FastAPI |
| [apps/web/README.md](apps/web/README.md) | Chạy React (Vite) |
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
npm run api      # http://127.0.0.1:8000 — docs: http://localhost:8000/docs
npm run dev      # :5173

**Lưu ý:** Mở **http://localhost:8000/docs** (không dùng `http://0.0.0.0:8000`).

`npm run api` tự **giải phóng port** (kill process cũ trên `API_PORT`) trước khi start. Nếu vẫn lỗi, đổi `API_PORT=8001` trong `.env`.
```

## Scripts chính

- `npm run build:questions` — build `ai102Questions.js`
- `npm run migrate:questions` — đẩy AI-102 + GH-300 vào PostgreSQL
- `npm run db:migrate` — Alembic schema (`upgrade head`)

**Alembic:** file `alembic.ini` nằm ở **root** hoặc `apps/api/`. Đừng chạy `alembic` global từ root nếu chưa có ini — dùng:

```powershell
npm run db:migrate
# hoặc
apps\api\venv\Scripts\alembic.exe upgrade head
```
