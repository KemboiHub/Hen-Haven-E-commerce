"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Seeding database...');
    // Create demo users
    const passwordHash = await bcrypt_1.default.hash('password123', 10);
    const users = [
        { name: 'John Doe', email: 'john.doe@example.com', phone: '254712345678', password: passwordHash },
        { name: 'Jane Smith', email: 'jane.smith@example.com', phone: '254798765432', password: passwordHash }
    ];
    for (const u of users) {
        const exists = await prisma.user.findUnique({ where: { email: u.email } });
        if (!exists) {
            await prisma.user.create({ data: u });
            console.log(`Created user ${u.email}`);
        }
    }
    // Create demo products
    const products = [
        { title: 'Kenbro Improved Kienyeji', slug: 'kenbro-improved-kienyeji', description: 'Hardy, friendly breed perfect for beginners', priceCents: 99900, stock: 20 },
        { title: 'Kari Improved Kienyeji', slug: 'kari-improved-kienyeji', description: 'Resilient and productive', priceCents: 120000, stock: 18 },
        { title: 'Farm Fresh Eggs (Dozen)', slug: 'farm-fresh-eggs-dozen', description: 'Free-range organic eggs', priceCents: 30000, stock: 100 }
    ];
    for (const p of products) {
        const exists = await prisma.product.findUnique({ where: { slug: p.slug } });
        if (!exists) {
            await prisma.product.create({ data: p });
            console.log(`Created product ${p.slug}`);
        }
    }
    console.log('Seeding finished.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
