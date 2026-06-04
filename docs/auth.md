# Authentication & RBAC

Email/password authentication with three roles: **student**, **teacher**, **admin**.

## Security model

| Control | Implementation |
|---------|----------------|
| Password storage | bcrypt via `passlib` (never plaintext) |
| Session | Short-lived JWT (`Authorization: Bearer`) |
| Token signing | `JWT_SECRET` from `.env` (min 32 chars in production) |
| Email | Normalized to lowercase; unique index |
| Registration | New accounts are **student** only |
| Login errors | Generic message (no email enumeration) |
| Inactive users | `is_active=false` blocks login and `/me` |
| RBAC | Server-side `Depends(require_roles(...))` on protected routes |

### Role hierarchy

```
admin  → full access (user management, future cert admin)
teacher → future: class/content tools (no user admin)
student → default; practice & own progress
```

`require_minimum_role(teacher)` allows **teacher** and **admin**.

### Bootstrap first admin (dev)

Set in `.env`:

```env
BOOTSTRAP_ADMIN_EMAIL=you@example.com
```

The **first** registration with that exact email gets role `admin`. Remove or clear the variable after bootstrap.

### Dev user seed

After `npm run db:migrate`, set in root `.env` (see `.env.example`):

- `SEED_USERS_PASSWORD`
- `SEED_ADMIN_EMAIL`
- `SEED_STUDENT_EMAIL`
- `SEED_TEACHER_EMAIL`

Then:

```bash
npm run seed:users
```

Creates or updates the three accounts (idempotent). Do not commit real passwords.

## API (`/api/v1`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/auth/register` | — | Register (student) |
| POST | `/auth/login` | — | Login → `accessToken`, `user` |
| POST | `/auth/logout` | — | Client clears token (no server session store) |
| GET | `/auth/me` | Bearer | Current user |
| GET | `/users` | admin | List users |
| PATCH | `/users/{id}/role` | admin | Change role |

Public cert/question endpoints stay unchanged for now; tighten per-route when syncing progress to DB.

## Frontend

- `AuthProvider` stores JWT in `sessionStorage` (survives refresh, cleared on logout/tab close vs `localStorage`)
- Routes: `/login`, `/register`
- Header shows user email, role badge, logout

## Env

See root `.env.example`: `JWT_SECRET`, `JWT_ALGORITHM`, `ACCESS_TOKEN_EXPIRE_MINUTES`, optional `BOOTSTRAP_ADMIN_EMAIL`.

## Migration

```bash
npm run db:migrate
```

Revision `003` adds `users` table and optional `quiz_sessions.user_id`.
