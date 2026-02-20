// Simple Prisma config object. Avoid importing prisma/config here to prevent
// TypeScript errors when the package is not available in the dev environment.
// Prisma CLI will still read this file and use the exported configuration.
const config = {
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: process.env.DATABASE_URL || "",
  },
};

export default config;