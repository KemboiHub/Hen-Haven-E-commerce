"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prismaClient_1 = __importDefault(require("../prismaClient"));
const auth_1 = require("../middleware/auth");
const m_pesa_1 = require("../services/m-pesa");
const router = express_1.default.Router();
// POST /api/orders
router.post('/', auth_1.requireAuth, async (req, res) => {
    try {
        const { items, shipping } = req.body; // items: [{ productId, quantity }]
        if (!items || !Array.isArray(items) || items.length === 0)
            return res.status(400).json({ error: 'No items' });
        // fetch products and compute total
        const productIds = items.map((it) => it.productId);
        const products = await prismaClient_1.default.product.findMany({ where: { id: { in: productIds } } });
        let totalCents = 0;
        const orderItemsData = [];
        for (const it of items) {
            const p = products.find(x => x.id === it.productId);
            if (!p)
                return res.status(400).json({ error: `Product ${it.productId} not found` });
            const qty = Number(it.quantity) || 1;
            totalCents += p.priceCents * qty;
            orderItemsData.push({ productId: p.id, unitPrice: p.priceCents, quantity: qty });
        }
        const order = await prismaClient_1.default.order.create({
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
        const darajaResp = await (0, m_pesa_1.stkPush)({ phone, amount: Math.round(totalCents / 100), accountReference: order.id });
        // darajaResp likely contains MerchantRequestID and CheckoutRequestID
        await prismaClient_1.default.order.update({ where: { id: order.id }, data: { merchantRequestId: darajaResp.MerchantRequestID || undefined, checkoutRequestId: darajaResp.CheckoutRequestID || undefined } });
        return res.json({ orderId: order.id, totalCents, daraja: darajaResp });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});
// Webhook for daraja callbacks
router.post('/callback', express_1.default.json(), async (req, res) => {
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
        const order = await prismaClient_1.default.order.findUnique({ where: { checkoutRequestId: checkoutRequestID } });
        await prismaClient_1.default.paymentCallback.create({ data: { orderId: order?.id, raw: body, resultCode, resultDesc } });
        if (resultCode === 0 && order) {
            await prismaClient_1.default.order.update({ where: { id: order.id }, data: { status: 'paid' } });
        }
        else if (order) {
            await prismaClient_1.default.order.update({ where: { id: order.id }, data: { status: 'failed' } });
        }
        return res.status(200).json({ result: 'received' });
    }
    catch (err) {
        console.error('callback error', err);
        return res.status(500).send('error');
    }
});
exports.default = router;
