"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDB = exports.connectDB = exports.prisma = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"]
});
exports.prisma = prisma;
const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("Database connected");
    }
    catch (err) {
        console.error("Database connection error", err);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
const disconnectDB = async () => {
    try {
        await prisma.$disconnect();
        console.log("Database disconnected");
    }
    catch (err) {
        console.error("Error disconnecting database", err);
    }
};
exports.disconnectDB = disconnectDB;
