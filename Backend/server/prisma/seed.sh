#!/bin/bash
# Helper to run prisma migrate and seed
npx prisma generate
npx prisma migrate dev --name init --create-only
npx prisma db push
# Run the TypeScript seed (requires ts-node)
node --loader ts-node/esm prisma/seed.ts
