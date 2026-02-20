# Hen Haven — Backend Scaffold

This folder contains a TypeScript + Express + Prisma scaffold for the Hen Haven backend.

Quick start (requires Docker):

1. Copy the env example and edit values:

```powershell
cd Backend/server
cp .env.example .env
# edit .env to set JWT_SECRET and Daraja keys
```

2. Start with docker-compose (Postgres + API):

```powershell
docker-compose up --build
```

3. Inside the container (or locally), run Prisma migrate and generate:

```powershell
# from Backend/server
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

API endpoints (examples):
- POST /api/auth/signup
- POST /api/auth/login
- GET /api/products
- POST /api/orders
- POST /api/orders/callback (Daraja webhook)

Notes:
- Update `.env` with your Daraja sandbox credentials and callback URL for STK push testing.
- This scaffold uses Postgres in docker-compose; you can change to a managed DB and set the DATABASE_URL accordingly.

Next steps I can do for you:
- Wire Prisma migrations and a seed script for demo products/users.
  
Postgres migration (ready-to-run)
1. I added a Postgres SQL migration file at `prisma/migrations/20260217_init/migration.sql` that creates the required tables.
2. To apply this migration and seed Postgres locally (requires Docker), run the helper script:

```powershell
cd Backend/server
.\scripts\apply_postgres_migration.ps1
```

This script will start a Postgres container (if you have Docker), apply the SQL migration via `psql`, generate the Prisma client, and run the TypeScript seed.

If you prefer to run commands manually, you can instead:

```powershell
# start Postgres
docker run -d --name henhaven-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=hen_haven -p 5432:5432 postgres:15

# set DATABASE_URL in PowerShell
$env:DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/hen_haven"

npx prisma generate
npx prisma db push # or run the SQL migration: docker cp prisma/migrations/20260217_init/migration.sql henhaven-postgres:/migration.sql; docker exec -it henhaven-postgres psql -U postgres -d hen_haven -f /migration.sql
npx prisma db seed --preview-feature || npx ts-node prisma/seed.ts
```

Notes:
- The committed SQL migration is intended to be a convenient, auditable baseline for Postgres. If you run `prisma migrate dev` against Postgres it will create Prisma's migration tracking tables as well.
- If you want me to run `prisma migrate dev` and commit the resulting `prisma/migrations` folder, I can generate it locally and add it to the repo — but I cannot execute Docker on your machine from here; so you'll need to run the PowerShell script or the manual commands above to apply the migration locally and then share the created migration folder if you want me to commit it.
- Add an OpenAPI spec for the API.
- Add tests and a GitHub Actions workflow.
