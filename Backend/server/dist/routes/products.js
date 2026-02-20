"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prismaClient_1 = __importDefault(require("../prismaClient"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// GET /api/products
router.get('/', async (req, res) => {
    const products = await prismaClient_1.default.product.findMany();
    return res.json(products.map(p => ({ ...p, price: (p.priceCents / 100).toFixed(2) })));
});
// GET /api/products/:id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const p = await prismaClient_1.default.product.findUnique({ where: { id } });
    if (!p)
        return res.status(404).json({ error: 'Not found' });
    return res.json({ ...p, price: (p.priceCents / 100).toFixed(2) });
});
// POST /api/products (admin)
router.post('/', auth_1.requireAuth, async (req, res) => {
    const { title, slug, description, priceCents, stock } = req.body;
    try {
        const product = await prismaClient_1.default.product.create({ data: { title, slug, description, priceCents, stock } });
        return res.status(201).json(product);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});
exports.default = router;
