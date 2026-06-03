# Kiến trúc BE – FE

## Tổng quan

| Thành phần | Công nghệ | Vai trò |
|------------|-----------|---------|
| FE | React + Vite (`src/`) | UI, routing, local cache |
| BE | FastAPI (`apps/api/`) | API REST, business logic |
| DB | PostgreSQL | Câu hỏi, meta chứng chỉ, sessions |
| Nguồn câu hỏi | `AI_102/*.json`, `src/data/gh300Questions.js` | Source of truth trước migrate |
| Pipeline | `scripts/` | Build JS bundle + migrate vào DB |

```mermaid
flowchart LR
  subgraph sources [Nguồn dữ liệu]
    JSON[AI_102 JSON]
    GH[gh300Questions.js]
  end

  subgraph scripts [Scripts]
    BUILD[build-exam-questions.mjs]
    MIGRATE[migrate-questions-to-db.mjs]
  end

  subgraph be [apps/api]
    API[FastAPI v1]
  end

  subgraph db [(PostgreSQL)]
    CERTS[certifications]
    PARTS[certification_parts]
    Q[questions]
  end

  subgraph fe [src]
    UI[React app]
  end

  JSON --> BUILD
  JSON --> MIGRATE
  GH --> MIGRATE
  BUILD --> JS[src/data/ai102Questions.js]
  MIGRATE --> PARTS
  MIGRATE --> db
  API --> db
  UI -.-> API
  UI --> JS
```

## Cấu trúc thư mục

```
practice_certificate/
├── apps/api/              # FastAPI
│   ├── app/
│   │   ├── api/v1/        # HTTP routers
│   │   ├── core/          # config, deps
│   │   ├── db/            # engine, base
│   │   ├── models/        # SQLAlchemy ORM
│   │   ├── schemas/       # Pydantic
│   │   ├── repositories/  # truy vấn DB
│   │   └── services/      # business logic
│   └── alembic/           # schema migrations
├── scripts/
│   ├── lib/               # transform + load sources
│   ├── build-exam-questions.mjs
│   └── migrate-questions-to-db.mjs
├── docs/                  # tài liệu
├── AI_102/                # raw AI-102 pages
└── src/                   # frontend
```

## Luồng dữ liệu câu hỏi

1. **Develop**: sửa JSON trong `AI_102/` hoặc `gh300Questions.js`.
2. **Build FE (tùy chọn)**: `npm run build:questions` → `ai102Questions.js`.
3. **Schema DB**: `npm run db:migrate`.
4. **Seed DB**: `npm run migrate:questions`.
5. **Runtime**: FE có thể đọc static hoặc `GET /api/v1/certs/{id}/questions`.

## Phase tiếp theo

- Auth + `user_cert_progress` sync
- FE online-first qua `src/api/`
- Redis cache (khi traffic cao)
