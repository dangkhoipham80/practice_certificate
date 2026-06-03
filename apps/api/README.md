# Practice Certificate API (FastAPI)

## Cài đặt

```powershell
cd apps/api
python -m venv venv
.\venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
```

Hoặc từ root (Windows):

```powershell
npm run api:install
```

## Cấu hình

Copy `.env` từ repo root (hoặc tạo `apps/api/.env`) với:

```env
DATABASE_URL=postgresql+asyncpg://postgres:PASSWORD@localhost:5432/practice_certificate
CORS_ORIGINS=http://localhost:5173
```

## Chạy

```powershell
# Trong apps/api, venv đã activate
alembic upgrade head
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Từ root (dùng `venv` sẵn, không cần activate):

```powershell
npm run db:migrate
npm run api
```

## Cấu trúc

```
app/
  api/v1/endpoints/   # HTTP
  services/           # business rules
  repositories/       # SQL
  models/             # ORM
  schemas/            # Pydantic
  core/               # settings, deps
```

Tài liệu: [docs/api.md](../../docs/api.md), [docs/architecture.md](../../docs/architecture.md).
