# API (FastAPI v1)

Base URL: `http://localhost:8000`

Swagger: [http://localhost:8000/docs](http://localhost:8000/docs)

## Endpoints

### Root

| Method | Path | Mô tả |
|--------|------|--------|
| GET | `/api` | Thông tin API |

### Health

| Method | Path | Mô tả |
|--------|------|--------|
| GET | `/api/v1/health` | Liveness |
| GET | `/api/v1/health/ready` | Readiness + ping DB |

### Auth (email / password)

| Method | Path | Auth | Mô tả |
|--------|------|------|--------|
| POST | `/api/v1/auth/register` | — | Đăng ký (role `student`) |
| POST | `/api/v1/auth/login` | — | Đăng nhập → JWT |
| POST | `/api/v1/auth/logout` | — | Client xóa token |
| GET | `/api/v1/auth/me` | Bearer | User hiện tại |
| GET | `/api/v1/users` | admin | Danh sách user |
| PATCH | `/api/v1/users/{id}/role` | admin | Đổi role |

Chi tiết RBAC: [auth.md](auth.md).

### Certifications & questions

| Method | Path | Mô tả |
|--------|------|--------|
| GET | `/api/v1/certs` | Danh sách cert + số câu |
| GET | `/api/v1/certs/{cert_id}/layout` | Parts + stats (tính từ DB) |
| GET | `/api/v1/certs/{cert_id}/meta` | Alias `/layout` (deprecated) |
| GET | `/api/v1/certs/{cert_id}/questions` | Toàn bộ câu hỏi |
| GET | `/api/v1/certs/{cert_id}/questions?quiz_only=true` | Chỉ MC quiz-eligible |

### Response mẫu — question

```json
{
  "topic": "1",
  "domainId": "plan-manage",
  "questionId": 2,
  "quizEligible": true,
  "type": "mc",
  "choices": ["..."],
  "correct": [3],
  "multiple": false,
  "text": "...",
  "questionKind": "mc"
}
```

Field names khớp object FE hiện tại (camelCase).

## Chạy local

```powershell
# Terminal 1 — DB (Docker)
docker compose up -d postgres

# Terminal 2 — venv + migrate + API
npm run api:install
npm run db:migrate
npm run migrate:questions
npm run api
```

## FE proxy (dev)

Thêm vào `vite.config.js`:

```js
server: {
  proxy: {
    '/api': { target: 'http://127.0.0.1:8000', changeOrigin: true },
  },
},
```

Gọi API qua `fetch('/api/v1/...')` (Vite proxy từ `VITE_API_PROXY` trong `.env`).
