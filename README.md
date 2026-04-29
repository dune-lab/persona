# persona

Student profile service. Manages creation and retrieval of student profiles, linked to a user from `atreides`.

Named after the Bene Gesserit concept of persona — the identity one presents to the world.

## Stack

- Node.js 24 + TypeScript
- Fastify (via `@enxoval/http`)
- PostgreSQL + TypeORM (via `@enxoval/db`)
- JWT auth middleware (via `@enxoval/auth`)
- No Kafka — pure HTTP + DB

## How to Run

```bash
cp .env.example .env
npm install
npm run migration:run
npm run dev
```

Or with Docker (from `platform/`):

```bash
docker-compose up persona
```

Default port: **3000**

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/health` | — | Health check |
| `GET` | `/docs` | — | API reference |
| `POST` | `/students` | Bearer JWT | Create or retrieve a student profile |
| `GET` | `/students` | Bearer JWT | List all students |
| `GET` | `/students/by-user/:userId` | Bearer JWT | Get student profile by user ID |

## Examples

### POST /students

The `userId` is extracted automatically from the JWT — do not send it in the body.

```bash
curl -X POST http://localhost:3000/students \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <token>' \
  -d '{ "name": "Alice", "email": "alice@example.com" }'
```

Idempotent by email — returns existing student if already created.

### GET /students/by-user/:userId

```bash
curl http://localhost:3000/students/by-user/uuid-here \
  -H 'Authorization: Bearer <token>'
```

Returns `404` if no student exists for that user.

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
| `JWT_SECRET` | Secret used to validate incoming tokens |

## Scripts

```bash
npm run dev                # dev server with hot reload
npm run build              # compile TypeScript
npm test                   # run all tests
npm run unit               # unit tests only
npm run integration        # integration tests only
npm run lint               # check formatting and lint
npm run lint-fix           # auto-fix
npm run migration:run      # apply migrations
npm run migration:revert   # revert last migration
```
