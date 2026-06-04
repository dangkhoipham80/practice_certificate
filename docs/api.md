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
| GET | `/api/v1/certs/{cert_id}/layout` | Parts + stats + `domains` + `topicMap` |
| GET | `/api/v1/certs/{cert_id}/meta` | Alias `/layout` (deprecated) |
| GET | `/api/v1/certs/{cert_id}/taxonomy` | Domains + ExamTopics map |
| PUT | `/api/v1/certs/{cert_id}/taxonomy` | admin — thay toàn bộ taxonomy |
| PUT | `/api/v1/certs/{cert_id}/taxonomy/domains/{slug}` | admin — upsert một domain |
| PUT | `/api/v1/certs/{cert_id}/taxonomy/topics/{topic_number}` | admin — upsert một topic |
| GET | `/api/v1/certs/{cert_id}/questions` | Toàn bộ câu hỏi (không có `page`) |
| GET | `/api/v1/certs/{cert_id}/questions?page=1&pageSize=20` | Trang câu hỏi (20 mặc định / trang) |
| GET | `/api/v1/certs/{cert_id}/questions?quiz_only=true` | Chỉ MC quiz-eligible |

Response phân trang thêm `page`, `pageSize`, `totalPages` (cùng `total` = tổng câu khớp filter).

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
  "questionKind": "mc",
  "uiConfig": {}
}
```

Field names khớp object FE hiện tại (camelCase).

`uiConfig` holds structured UI blocks (type, items, drop_zones, template, …). See [exam-question-parser-prompt.md](exam-question-parser-prompt.md).

| Method | Path | Auth | Mô tả |
|--------|------|------|--------|
| PATCH | `/api/v1/certs/{cert_id}/questions/{external_id}` | admin | Cập nhật câu — gửi đủ field cần lưu: `text`, `explanation`, `quizEligible`, `domainId`, `topic`, `images`, `warn`, `choices`, `correct`, `multiple`, `uiConfig`, `questionTypeId` |

### Question types (DB)

| Method | Path | Auth | Mô tả |
|--------|------|------|--------|
| GET | `/api/v1/question-types` | — | Danh sách type đang active |
| GET | `/api/v1/question-types/manage` | admin | Tất cả types (kể cả inactive) |
| POST | `/api/v1/question-types` | admin | Tạo type |
| PATCH | `/api/v1/question-types/{id}` | admin | Sửa type |
| DELETE | `/api/v1/question-types/{id}` | admin | Deactivate (soft) |

Seed: migration `005_question_types`. Mỗi type có `slug`, `label`, `legacyKind`, `legacyType`, `schema` (JSON editor config).

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
