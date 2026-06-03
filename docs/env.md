# Biến môi trường (.env)

Tất cả cấu hình runtime đọc từ **`.env` ở thư mục gốc repo** (không hardcode trong code).

## Bắt buộc

| Biến | Dùng bởi |
|------|----------|
| `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, `PGPASSWORD` | `migrate-questions-to-db.mjs`, Docker Compose |
| `DATABASE_URL` | FastAPI, Alembic |
| `CORS_ORIGINS` | FastAPI CORS |
| `VITE_API_PROXY` | Vite dev proxy → API |

Copy từ `.env.example` và điền mật khẩu thật.

## Git

| File | Git |
|------|-----|
| `.env` | **Ignored** — không commit secrets |
| `.env.example` | **Tracked** — mẫu cho team |
| `apps/api/requirements.txt` | **Tracked** |
| `apps/api/venv/` | **Ignored** |
| `apps/api/alembic/versions/` | **Tracked** |

## Thiếu .env

- FastAPI: lỗi khi start (`Missing .env at ...`)
- Migrate script: `Missing required env: PGHOST`
- Vite: `VITE_API_PROXY is required in .env`
