# Kiến trúc BE – FE

## Tổng quan

| Thành phần | Công nghệ | Vai trò |
|------------|-----------|---------|
| FE | React + Vite (`apps/web/`) | UI, routing, local cache |
| BE | FastAPI (`apps/api/`) | API REST, business logic |
| DB | PostgreSQL | Câu hỏi, meta chứng chỉ, sessions |
| Nguồn câu hỏi | `apps/web/src/data/*.js` | Bundles FE; DB qua migrate |
| Pipeline | `scripts/` (repo root) | Build JS bundle + migrate vào DB |

```mermaid
flowchart LR
  subgraph sources [Nguồn dữ liệu]
    AI102[ai102Questions.js]
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

  subgraph fe [apps/web]
    UI[React app]
  end

  AI102 --> BUILD
  AI102 --> MIGRATE
  GH --> MIGRATE
  BUILD --> AI102
  MIGRATE --> PARTS
  MIGRATE --> db
  API --> db
  UI -.-> API
  UI --> AI102
```

## Cấu trúc thư mục

```
practice_certificate/
├── apps/
│   ├── api/               # FastAPI (BE)
│   │   ├── app/
│   │   └── alembic/
│   └── web/               # React + Vite (FE)
│       ├── src/
│       ├── public/
│       └── vite.config.js
├── scripts/               # build + migrate (orchestration)
├── docs/
├── .env                   # shared env (DB, JWT, Vite proxy)
├── package.json           # npm scripts (dev, api, migrate)
└── alembic.ini
```

## Luồng dữ liệu câu hỏi

1. **Develop**: sửa `apps/web/src/data/ai102Questions.js` hoặc `gh300Questions.js`.
2. **Build FE (tùy chọn)**: `npm run build:questions`.
3. **Schema DB**: `npm run db:migrate`.
4. **Seed DB**: `npm run migrate:questions`.
5. **Runtime**: FE đọc static hoặc `GET /api/v1/certs/{id}/questions`.

## Phase tiếp theo

- Auth + `user_cert_progress` sync
- FE online-first qua `apps/web/src/api/`
- Redis cache (khi traffic cao)
