# Data pipeline — câu hỏi

## File quan trọng

| File | Vai trò |
|------|---------|
| `scripts/lib/question-sources.mjs` | Đăng ký nguồn + `loadAllQuestionBanks()` |
| `scripts/lib/question-transform.mjs` | Transform JSON ExamTopics → object FE |
| `scripts/build-exam-questions.mjs` | Export `ai102Questions.js` |
| `scripts/migrate-questions-to-db.mjs` | Ghi vào PostgreSQL |

## AI-102

Nguồn pipeline: `apps/web/src/data/ai102Questions.js` (+ `ai102ExamMeta`).

Để sửa câu hỏi AI-102: chỉnh `ai102Questions.js` (hoặc tái tạo từ backup JSON nếu có), rồi `npm run migrate:questions`. Runtime đọc question bank từ PostgreSQL qua API.

## GH-300

Đã ở format app (`text`, `choices`, `correct`). Migrate gán `questionId = index + 1`, meta từ `gh300Exam.js`.

## Thêm certification mới

1. Thêm entry vào `EXAM_SOURCES` (folder JSON hoặc module JS).
2. Nếu cần bundle FE: thêm vào `JS_OUTPUTS` trong `build-exam-questions.mjs`.
3. Tạo certification bằng tài khoản admin trong **Cert catalog**, hoặc gọi `POST /api/v1/certs`.
4. Nạp taxonomy, parts và questions vào PostgreSQL. Frontend đọc catalog, layout và question bank qua API; không cần đăng ký cert trong source code.
5. `npm run db:migrate` (nếu đổi schema) + `npm run migrate:questions`.

## Không commit

- `.env` (credentials)
- `node_modules/`, `dist/`

Nguồn JS trong `apps/web/src/data/` — DB là runtime store cho API/multi-client.
