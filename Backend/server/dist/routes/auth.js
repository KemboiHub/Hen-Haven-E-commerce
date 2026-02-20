"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prismaClient_1 = __importDefault(require("../prismaClient"));
const router = express_1.default.Router();
// POST /api/auth/signup
router.post('/signup', async (req, res) => {
    const { name, email, password, phone } = req.body;
    if (!email || !password || !name)
        return res.status(400).json({ error: 'Missing fields' });
    try {
        const existing = await prismaClient_1.default.user.findUnique({ where: { email } });
        if (existing)
            return res.status(400).json({ error: 'User already exists' });
        const hash = await bcrypt_1.default.hash(password, 12);
        const user = await prismaClient_1.default.user.create({ data: { name, email, password: hash, phone } });
        return res.status(201).json({ id: user.id, email: user.email, name: user.name });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});
// POST /api/auth/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ error: 'Missing fields' });
    try {
        const user = await prismaClient_1.default.user.findUnique({ where: { email } });
        if (!user)
            return res.status(400).json({ error: 'Invalid credentials' });
        const ok = await bcrypt_1.default.compare(password, user.password);
        if (!ok)
            return res.status(400).json({ error: 'Invalid credentials' });
        const secret = process.env.JWT_SECRET || 'dev_secret';
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, secret, { expiresIn: '7d' });
        return res.json({ token, user: { id: user.id, email: user.email, name: user.name, phone: user.phone } });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});
exports.default = router;
