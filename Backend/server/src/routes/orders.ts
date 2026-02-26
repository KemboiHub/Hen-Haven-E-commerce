import express from 'express';
import prisma from '../prismaClient';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { stkPush } from '../services/m-pesa';

const router = express.Router();

// POST /api/orders
router.post('/', requireAuth, async (req: AuthRequest, res) => {
  try {
    const { items, shipping } = req.body; // items: [{ productId, quantity }]
    if (!items || !Array.isArray(items) || items.length === 0) return res.status(400).json({ error: 'No items' });

    // fetch products and compute total
    const productIds = items.map((it: any) => it.productId);
    const products = await prisma.product.findMany({ where: { id: { in: productIds } } });

    let totalCents = 0;
    const orderItemsData: any[] = [];
    for (const it of items) {
      const p = products.find(x => x.id === it.productId);
      if (!p) return res.status(400).json({ error: `Product ${it.productId} not found` });
      const qty = Number(it.quantity) || 1;
      totalCents += p.priceCents * qty;
      orderItemsData.push({ productId: p.id, unitPrice: p.priceCents, quantity: qty });
    }
    const order = await prisma.order.create({
      data: {
        userId: req.userId,
        totalCents,
        currency: 'KES',
        status: 'pending',
        items: { create: orderItemsData }
      },
      include: { items: true }
    });

    // Initiate STK push (frontend may call payments endpoint directly, but we show wiring here)
    const phone = (req.body.phone) || (req.body.userPhone);
    if (!phone) {
      return res.json({ orderId: order.id, totalCents });
    }

    const darajaResp = await stkPush({ phone, amount: Math.round(totalCents / 100), accountReference: order.id });
    // darajaResp likely contains MerchantRequestID and CheckoutRequestID
    await prisma.order.update({ where: { id: order.id }, data: { merchantRequestId: darajaResp.MerchantRequestID || undefined, checkoutRequestId: darajaResp.CheckoutRequestID || undefined } });

    return res.json({ orderId: order.id, totalCents, daraja: darajaResp });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Webhook for daraja callbacks
router.post('/callback', express.json(), async (req, res) => {
  try {
    const body = req.body;
    // Attempt to parse known fields
    const callback = body?.Body?.stkCallback;
    if (!callback) {
      console.warn('Unknown callback shape', body);
      return res.status(200).send('OK');
    }
    const merchantRequestID = callback.MerchantRequestID;
    const checkoutRequestID = callback.CheckoutRequestID;
    const resultCode = callback.ResultCode;
    const resultDesc = callback.ResultDesc || '';

    // find order by checkoutRequestId
    const order = await prisma.order.findUnique({ where: { checkoutRequestId: checkoutRequestID } });

    await prisma.paymentCallback.create({ data: { orderId: order?.id, raw: body, resultCode, resultDesc } });

    if (resultCode === 0 && order) {
      await prisma.order.update({ where: { id: order.id }, data: { status: 'paid' } });
    } else if (order) {
      await prisma.order.update({ where: { id: order.id }, data: { status: 'failed' } });
    }

    return res.status(200).json({ result: 'received' });
  } catch (err) {
    console.error('callback error', err);
    return res.status(500).send('error');
  }
});

export default router;
