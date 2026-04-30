# persona

Student profile service. Manages creation and retrieval of student profiles, linked to a user from `atreides`.

Named after the Bene Gesserit concept of persona — the identity one presents to the world.

## Stack

- Node.js 22 + TypeScript
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
npm run build              # compile TypeScript + generate contracts.json
npm test                   # run all tests
npm run unit               # unit tests only
npm run integration        # integration tests only
npm run lint               # check formatting and lint
npm run lint-fix           # auto-fix formatting
npm run migration:run      # apply pending migrations
npm run migration:revert   # revert last migration
```

## CI Pipeline

Every PR runs 5 checks in sequence:

```
Build
├── Unit Tests
├── Integration Tests
└── Publish Contracts
        └── Contract Validation
```

| Check | Description |
|-------|-------------|
| **Build** | Compiles TypeScript, generates `contracts.json` |
| **Unit Tests** | Fast tests, no external dependencies |
| **Integration Tests** | Tests with DB |
| **Publish Contracts** | Publishes `contracts.json` to [dune-lab/contracts](https://github.com/dune-lab/contracts) |
| **Contract Validation** | Runs kanly — validates wire compatibility with all HTTP partners |

## Contract Validation

Wire types live in `src/wire/`. After every build, `contracts.json` is generated automatically via the `postbuild` script and published to the contract registry.

To add metadata to a wire type for richer kanly logs:

```ts
static describe() {
  return {
    _meta: { method: 'GET', path: '/students/by-user/:userId' },
    id: { type: 'uuid' },
    userId: { type: 'uuid' },
  };
}
```
