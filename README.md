# persona

Student profile service. Manages the creation and retrieval of student profiles, each linked to a user account in `atreides`.

Named after the Bene Gesserit concept of persona — the identity one presents to the world.

---

## Responsibilities

- Create student profiles tied to user accounts
- Expose student data to other services (odyssey, imperium)
- Enforce that one user maps to at most one student profile

---

## Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 24 + TypeScript |
| HTTP | Fastify (`@enxoval/http`) |
| Database | PostgreSQL 16 + TypeORM (`@enxoval/db`) |
| Auth | JWT Bearer (`@enxoval/auth`) |
| Logging | Pino structured JSON (`@enxoval/observability`) |
| Validation | `createSchema` + `asyncFn` (`@enxoval/types`) |
| Messaging | None — pure HTTP + DB |

---

## HTTP API

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/health` | — | Health check |
| `GET` | `/docs` | — | API reference |
| `POST` | `/students` | Bearer JWT | Create student profile for the current user |
| `GET` | `/students` | Bearer JWT | List all students |
| `GET` | `/students/by-user/:userId` | Bearer JWT | Get student profile by user ID |

### POST /students

The `userId` is **extracted from the JWT** — it does not need to be in the request body.

```bash
curl -X POST http://localhost:3000/students \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <token>' \
  -d '{ "name": "Alice", "email": "alice@example.com" }'
```

### GET /students/by-user/:userId

Called by `imperium` during `GET /me` to resolve the student profile for the authenticated user.

```bash
curl http://localhost:3000/students/by-user/uuid-here \
  -H 'Authorization: Bearer <token>'
```

Returns `404` if no student profile exists for that user.

---

## Database Schema

| Table | Description |
|-------|-------------|
| `students` | Student profiles (id, name, email, userId, createdAt) |

`userId` is a foreign reference (opaque UUID) to an atreides user — no join or foreign key enforcement across service boundaries.

Migrations are located in `src/db/migrations/` and run automatically on startup.

---

## Observability

Every request emits structured JSON logs:

```json
{ "level": "info", "service": "persona", "cid": "abc:0", "method": "POST", "url": "/students", "msg": "http-server: request received" }
{ "level": "info", "service": "persona", "cid": "abc:0", "status": 201, "durationMs": 9, "msg": "http-server: response sent" }
```

Logs are available in Grafana via `{service="persona"}`.

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | HTTP port (default: `3000`) |
| `HOST` | Bind address (default: `0.0.0.0`) |
| `DB_HOST` | Postgres host |
| `DB_PORT` | Postgres port |
| `DB_USER` | Postgres user |
| `DB_PASSWORD` | Postgres password |
| `DB_NAME` | Postgres database name |
| `JWT_SECRET` | Secret shared across all services |

---

## Running Locally

```bash
cp .env.example .env
npm install
npm run migration:run
npm run dev
```

Default port: **3000**

---

## Scripts

```bash
npm run dev              # start with hot reload
npm run build            # compile TypeScript
npm test                 # run all tests (Vitest)
npm run lint             # check formatting + lint
npm run lint-fix         # auto-fix
npm run migration:run    # apply pending migrations
npm run migration:revert # revert last migration
```

---

## Dependency Updates

`@enxoval/*` dependencies are bumped automatically. When a new version is published from [dune-lab/enxoval](https://github.com/dune-lab/enxoval), a GitHub Actions workflow opens a PR in this repo updating `package.json` and `package-lock.json`. No manual version bumping required.
