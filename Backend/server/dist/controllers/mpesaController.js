"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mpesaCallback = exports.stkPush = void 0;
const mpesaService_1 = __importDefault(require("../services/mpesaService"));
const stkPush = async (req, res) => {
    try {
        const { phone, amount } = req.body;
        const result = await mpesaService_1.default.stkPush(phone, amount);
        res.json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: "STK push failed"
        });
    }
};
exports.stkPush = stkPush;
const mpesaCallback = async (req, res) => {
    try {
        await mpesaService_1.default.handleCallback(req.body);
        res.json({ ResultCode: 0 });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Callback failed"
        });
    }
};
exports.mpesaCallback = mpesaCallback;
