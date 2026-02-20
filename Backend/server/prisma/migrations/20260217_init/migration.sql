-- PostgreSQL migration for Hen Haven (initial schema)
-- Run this SQL against your Postgres database (psql) or via docker exec psql

-- Enable pgcrypto for gen_random_uuid (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users
CREATE TABLE IF NOT EXISTS "User" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  phone TEXT,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'customer',
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Products
CREATE TABLE IF NOT EXISTS "Product" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  "priceCents" INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'KES',
  stock INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Orders
CREATE TABLE IF NOT EXISTS "Order" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "userId" TEXT REFERENCES "User"(id) ON DELETE SET NULL,
  "totalCents" INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'KES',
  status TEXT NOT NULL DEFAULT 'pending',
  "checkoutRequestId" TEXT UNIQUE,
  "merchantRequestId" TEXT,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- OrderItems
CREATE TABLE IF NOT EXISTS "OrderItem" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "orderId" TEXT NOT NULL REFERENCES "Order"(id) ON DELETE CASCADE,
  "productId" TEXT NOT NULL REFERENCES "Product"(id) ON DELETE RESTRICT,
  "unitPrice" INTEGER NOT NULL,
  quantity INTEGER NOT NULL
);

-- Payment callbacks
CREATE TABLE IF NOT EXISTS "PaymentCallback" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "orderId" TEXT REFERENCES "Order"(id) ON DELETE SET NULL,
  raw JSONB NOT NULL,
  "resultCode" INTEGER NOT NULL,
  "resultDesc" TEXT,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_order_userId ON "Order"("userId");
CREATE INDEX IF NOT EXISTS idx_orderitem_orderId ON "OrderItem"("orderId");
CREATE INDEX IF NOT EXISTS idx_paymentcallback_orderId ON "PaymentCallback"("orderId");
