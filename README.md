# persona

Student identity service. Manages creation and retrieval of student profiles.

## Stack

- Node.js 24 + TypeScript
- Fastify (via `@enxoval/http`)
- PostgreSQL + TypeORM (via `@enxoval/db`)
- No Kafka — pure HTTP + DB

## How to Run

```bash
cp .env.example .env
npm install
npm run migration:run
npm run dev
```

Or with Docker:

```bash
docker-compose up
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Health check |
| `GET` | `/docs` | API reference |
| `POST` | `/students` | Create or retrieve a student |
| `GET` | `/students` | List all students |

## POST /students

```bash
curl -X POST http://localhost:3000/students \
  -H 'Content-Type: application/json' \
  -d '{ "name": "Alice", "email": "alice@example.com" }'
```

Returns the student (existing or newly created). Idempotent by email.

## Scripts

```bash
npm run dev          # dev server with hot reload
npm run build        # compile TypeScript
npm test             # run all tests
npm run unit         # unit tests only
npm run integration  # integration tests only
npm run lint         # check formatting and lint
npm run lint-fix     # auto-fix
npm run migration:run      # apply migrations
npm run migration:revert   # revert last migration
```
