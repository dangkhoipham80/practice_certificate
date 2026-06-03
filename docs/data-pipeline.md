# Data pipeline — câu hỏi

## File quan trọng

| File | Vai trò |
|------|---------|
| `scripts/lib/question-sources.mjs` | Đăng ký nguồn + `loadAllQuestionBanks()` |
| `scripts/lib/question-transform.mjs` | Transform JSON ExamTopics → object FE |
| `scripts/build-exam-questions.mjs` | Export `ai102Questions.js` |
| `scripts/migrate-questions-to-db.mjs` | Ghi vào PostgreSQL |

## Transform (AI-102)

Raw JSON (`pageProps.questions[]`) → object:

- MC: map `choices` A–H → array, `answer` → `correct` indices
- Interactive: `quizEligible: false`, `questionKind` từ `ai102InteractiveKind`
- Domain: `ai102DomainClassifier`

Dedupe theo `question_id` khi đọc nhiều page files.

## GH-300

Đã ở format app (`text`, `choices`, `correct`). Migrate gán `questionId = index + 1`, meta từ `gh300Exam.js`.

## Thêm certification mới

1. Thêm entry vào `EXAM_SOURCES` (folder JSON hoặc module JS).
2. Nếu cần bundle FE: thêm vào `JS_OUTPUTS` trong `build-exam-questions.mjs`.
3. Đăng ký cert trong `src/config/certRegistry.js`.
4. `npm run db:migrate` (nếu đổi schema) + `npm run migrate:questions`.

## Không commit

- `.env` (credentials)
- `node_modules/`, `dist/`

Nguồn JSON `AI_102/` và `gh300Questions.js` vẫn là source — DB là runtime store cho API/multi-client.
