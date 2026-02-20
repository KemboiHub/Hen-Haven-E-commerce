import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(
    {
        log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"]
    }
);

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("Database connected");
    } catch (err) {
        console.error("Database connection error", err);
        process.exit(1);
    }
};

const disconnectDB = async () => {
    try {
        await prisma.$disconnect();
        console.log("Database disconnected");
    } catch (err) {
        console.error("Error disconnecting database", err);
    }
};

export { prisma, connectDB, disconnectDB };