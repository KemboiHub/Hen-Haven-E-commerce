import express from 'express';
import prisma from '../prismaClient';
import { requireAuth } from '../middleware/auth';

const router = express.Router();

// GET /api/products
router.get('/', async (req, res) => {
  const products = await prisma.product.findMany();
  return res.json(products.map(p => ({ ...p, price: (p.priceCents / 100).toFixed(2) })));
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const p = await prisma.product.findUnique({ where: { id } });
  if (!p) return res.status(404).json({ error: 'Not found' });
  return res.json({ ...p, price: (p.priceCents / 100).toFixed(2) });
});
// POST /api/products (admin)
router.post('/', requireAuth, async (req: any, res: any) => {
  const { title, slug, description, priceCents, stock } = req.body;
  try {
    const product = await prisma.product.create({ data: { title, slug, description, priceCents, stock } });
    return res.status(201).json(product);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

export default router;
