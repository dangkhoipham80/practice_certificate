# Scripts

## Câu hỏi

| Lệnh | Script | Mô tả |
|------|--------|--------|
| `npm run build:questions` | `build-exam-questions.mjs` | Build `ai102Questions.js` từ `AI_102/` |
| `npm run migrate:questions` | `migrate-questions-to-db.mjs` | Đẩy tất cả certs vào PostgreSQL |

Yêu cầu: `.env` với `PG*`, schema đã `alembic upgrade head`.

## Thư viện dùng chung

- `lib/question-transform.mjs` — logic transform
- `lib/question-sources.mjs` — danh sách exam + loader

Chi tiết: [docs/migration.md](../docs/migration.md).
