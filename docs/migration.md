# Quy trình migrate câu hỏi

## Tổng quan pipeline

```
Nguồn thô  →  scripts/lib (transform)  →  PostgreSQL  →  FastAPI
```

| Bước | Lệnh | Kết quả |
|------|------|---------|
| 1 | Tạo DB trong pgAdmin4 | Database `practice_certificate` |
| 2 | `npm run db:migrate` | Bảng `certifications`, `questions`, … |
| 3 | `npm run migrate:questions` | Upsert certs + insert questions |
| 4 | `npm run api` | API phục vụ từ DB |

## Nguồn dữ liệu

Định nghĩa trong `scripts/lib/question-sources.mjs`:

| Cert | Nguồn |
|------|--------|
| `ai-102` | `apps/web/src/data/ai102Questions.js` |
| `gh-300` | `apps/web/src/data/gh300Questions.js` + meta `apps/web/src/config/gh300Exam.js` |

Thêm cert mới: mở rộng `EXAM_SOURCES`, chạy lại migrate.

## Script migrate

`scripts/migrate-questions-to-db.mjs`:

1. `loadAllQuestionBanks()` — transform giống build script
2. Transaction:
   - `UPSERT certifications` (cột `grid_page_size`, `source_file_count`)
   - `REPLACE certification_parts`
   - `REPLACE questions` (batch 100)

**Idempotent**: chạy lại an toàn sau khi sửa JSON.

## Build bundle FE (tùy chọn)

```bash
npm run build:questions
```

Chỉ ghi `apps/web/src/data/ai102Questions.js` (AI-102). GH-300 vẫn từ `gh300Questions.js`.

## Kiểm tra sau migrate

```sql
SELECT cert_id, COUNT(*) FROM questions GROUP BY cert_id;
SELECT id, exam_code, meta->'quizEligible' FROM certifications;
```

Hoặc API:

- `GET http://localhost:8000/api/v1/certs`
- `GET http://localhost:8000/api/v1/certs/ai-102/questions?quiz_only=true`

## Troubleshooting

| Lỗi | Cách xử lý |
|-----|------------|
| `relation "certifications" does not exist` | Chạy `db:migrate` trước |
| `password authentication failed` | Kiểm tra `.env` / pgAdmin4 |
| Duplicate key | Script xóa theo cert trước insert — kiểm tra transaction rollback |
