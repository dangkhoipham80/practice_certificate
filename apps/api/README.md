# Practice Certificate API (FastAPI)

## Cài đặt

**Khuyến nghị** (từ thư mục gốc repo) — chỉ tạo `venv` nếu chưa có:

```powershell
npm run api:install
```

Nếu tạo `venv` thủ công và gặp lỗi *Unable to copy venvlauncher.exe* (venv đã tồn tại):

1. Dùng `npm run api:install` — không gọi lại `python -m venv venv`.
2. Hoặc xóa hẳn rồi tạo mới (đóng terminal/IDE đang chạy API trước):

```powershell
cd apps/api
Remove-Item -Recurse -Force venv
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## Cấu hình

Copy `.env` từ repo root (hoặc tạo `apps/api/.env`) với:

```env
DATABASE_URL=postgresql+asyncpg://postgres:PASSWORD@localhost:5432/practice_certificate
CORS_ORIGINS=http://localhost:5173
```

## Chạy

```powershell
# Từ thư mục gốc repo (khuyến nghị)
npm run db:migrate
npm run api
```

Trình duyệt: **http://localhost:8000/docs** — không mở `http://0.0.0.0:8000` (lỗi ERR_ADDRESS_INVALID).

Trong `apps/api` (venv đã activate):

```powershell
alembic upgrade head
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

LAN / điện thoại cùng Wi‑Fi: `npm run api:lan` rồi `http://<IP-máy>:8000/docs`.

**Lưu ý:** `alembic upgrade head` từ `D:\practice_certificate` (root) cần dùng venv:

```powershell
cd D:\practice_certificate
.\apps\api\venv\Scripts\alembic.exe upgrade head
```

Hoặc `alembic.ini` ở root + lệnh trên — không dùng `alembic` global nếu không có `[alembic]` trong cwd.

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
