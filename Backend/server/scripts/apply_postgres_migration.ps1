# Apply Postgres migration and seed for Hen Haven backend
# Usage: run this in PowerShell on a machine with Docker installed
#   cd Backend/server
#   .\scripts\apply_postgres_migration.ps1

$ErrorActionPreference = 'Stop'

# Configurable variables
$POSTGRES_USER = 'postgres'
$POSTGRES_PASSWORD = 'postgres'
$POSTGRES_DB = 'hen_haven'
$POSTGRES_PORT = 5432
$CONTAINER_NAME = 'henhaven-postgres'

Write-Host "Starting Postgres docker container ($CONTAINER_NAME)..."
# Start Postgres container (if not already running)
$existing = docker ps -a --format "{{.Names}}" | Select-String $CONTAINER_NAME -Quiet
if (-not $existing) {
  docker run -d --name $CONTAINER_NAME -e POSTGRES_USER=$POSTGRES_USER -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD -e POSTGRES_DB=$POSTGRES_DB -p $POSTGRES_PORT:5432 postgres:15
} else {
  $running = docker ps --format "{{.Names}}" | Select-String $CONTAINER_NAME -Quiet
  if (-not $running) {
    docker start $CONTAINER_NAME
  }
}

Write-Host "Waiting for database to be ready..."
Start-Sleep -Seconds 5

# Export DATABASE_URL for Prisma
$env:DATABASE_URL = "postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@localhost:$POSTGRES_PORT/$POSTGRES_DB"

Write-Host "Applying SQL migration file directly via docker exec psql..."
# Copy SQL into container and apply
$localSql = (Resolve-Path "./prisma/migrations/20260217_init/migration.sql").Path
if (-not (Test-Path $localSql)) { throw "Migration SQL not found: $localSql" }

# Use docker exec to run psql with file content
docker cp $localSql $CONTAINER_NAME:/migration.sql
docker exec -i $CONTAINER_NAME psql -U $POSTGRES_USER -d $POSTGRES_DB -f /migration.sql

Write-Host "Generating Prisma client and running seed..."
npx prisma generate
npx prisma db seed --preview-feature || npx ts-node prisma/seed.ts

Write-Host "Done. DB should be seeded. DATABASE_URL=$env:DATABASE_URL"
