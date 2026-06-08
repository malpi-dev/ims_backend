# IMS Backend — Agent Guide

## Quick start

```bash
yarn install
# copy .env and edit (dev values already committed)
yarn start:dev        # hot-reload on :3000
yarn seed             # resets DB with test data (deletes everything first)
yarn test             # unit tests (Jest, *.spec.ts in src/)
yarn test:e2e         # e2e tests (MongoMemoryServer, *.e2e-spec.ts)
yarn lint             # ESLint flat config + Prettier, --fix
yarn format           # Prettier --write
yarn build            # nest build -> dist/
```

## Architecture

NestJS 10, Mongoose ODM (MongoDB), JWT auth, Swagger docs.

Single-package app. All source in `src/`, compiled output to `dist/` (gitignored).

### Modules

| Module    | Path                     | Purpose                                                |
| --------- | ------------------------ | ------------------------------------------------------ |
| Auth      | `src/modules/auth/`      | Login, register, refresh, password reset, JWT strategy |
| Users     | `src/modules/users/`     | User CRUD (super-user only)                            |
| Clients   | `src/modules/clients/`   | Clients & areas                                        |
| Tickets   | `src/modules/tickets/`   | Tickets, problem types, resolutions                    |
| Inventory | `src/modules/inventory/` | Brands, models, products, parts, attributes            |
| Files     | `src/modules/files/`     | Cloudinary upload via Multer memoryStorage             |
| Dashboard | `src/modules/dashboard/` | Aggregated metrics                                     |

### Global infrastructure (`src/common/`)

- **Guards**: `JwtAuthGuard` (global, opt-out via `@Public()`), `RolesGuard` (enforce with `@Roles()`)
- **Interceptor**: `TransformInterceptor` wraps responses as `{ data, message }` or `{ data, meta, message }` (paginated)
- **Filter**: `HttpExceptionFilter` unifies errors; MongoDB dup key (code 11000) → 409
- **Soft delete**: All schemas extend `BaseSchema` with `deletedAt`. `SoftDeleteInterceptor` sets `includeDeleted=false` by default.
- **Pagination**: List endpoints accept `search`, `page`, `limit` (default 20, max 100), `includeDeleted`

## Key conventions

- **Roles**: `super-user`, `admin`, `technician`, `user`
- **Public endpoints**: decorate with `@Public()` to bypass global JWT guard
- **Test users**: `yarn seed` creates 4 users (see START.md); passwords are `ChangeMe123!`
- **Swagger**: `/api/docs` — protected with basic auth when `NODE_ENV != development` (default creds: admin / admin123)
- **Prettier**: single quotes, trailing commas everywhere, endOfLine auto
- **ESLint quirks**: `no-explicit-any` off, `no-floating-promises` warn, `no-unsafe-argument` warn

## Commands that differ from defaults

- `yarn start:dev` uses `NODE_NO_WARNINGS=1` prefix (also on `start`, `start:debug`)
- `yarn seed` runs via `ts-node -r tsconfig-paths/register src/seed.ts` — destroys all collections then inserts test data
- No `docker-compose`; MongoDB expected at `MONGODB_URI` (local, Docker, or Atlas)

## Tests

- Unit tests: `*.spec.ts` co-located in `src/` — `rootDir: src` in Jest config
- E2E tests: `*.e2e-spec.ts` in `test/` — uses `MongoMemoryServer` (in-memory MongoDB)
- No snapshot tests, no integration test prerequisites (DB handled in-memory for e2e)

## Deploy

- CI pushes to `main` → Fly.io deploy via `.github/workflows/fly-deploy.yml`
- `fly.toml` configures region `dfw`, 256MB VM, internal port 3000
- Dockerfile: multi-stage, `node:22.21.1-slim` base
