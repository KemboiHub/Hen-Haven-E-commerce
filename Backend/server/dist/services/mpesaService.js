"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const prismaClient_1 = __importDefault(require("../prismaClient"));
const darajaAuth_1 = require("../utils/darajaAuth");
const timestamp_1 = require("../utils/timestamp");
class MpesaService {
    async stkPush(phone, amount) {
        const token = await (0, darajaAuth_1.getAccessToken)();
        const shortcode = process.env.MPESA_SHORTCODE;
        const passkey = process.env.MPESA_PASSKEY;
        const timestamp = (0, timestamp_1.getTimestamp)();
        const password = Buffer
            .from(shortcode + passkey + timestamp)
            .toString("base64");
        const payload = {
            BusinessShortCode: shortcode,
            Password: password,
            Timestamp: timestamp,
            TransactionType: "CustomerPayBillOnline",
            Amount: amount,
            PartyA: phone,
            PartyB: shortcode,
            PhoneNumber: phone,
            CallBackURL: process.env.MPESA_CALLBACK_URL,
            AccountReference: "HenHaven",
            TransactionDesc: "Payment"
        };
        const response = await axios_1.default.post("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const checkoutRequestId = response.data.CheckoutRequestID;
        await prismaClient_1.default.mpesaTransaction.create({
            data: {
                phone,
                amount,
                checkoutRequestId,
                status: "PENDING",
            }
        });
        return response.data;
    }
    async handleCallback(callbackBody) {
        const stk = callbackBody.Body.stkCallback;
        const checkoutRequestId = stk.CheckoutRequestID;
        if (stk.ResultCode === 0) {
            const receipt = stk.CallbackMetadata.Item.find((item) => item.Name === "MpesaReceiptNumber").Value;
            await prismaClient_1.default.mpesaTransaction.update({
                where: { checkoutRequestId },
                data: {
                    status: "SUCCESS",
                    mpesaReceiptNumber: receipt,
                }
            });
        }
        else {
            await prismaClient_1.default.mpesaTransaction.update({
                where: { checkoutRequestId },
                data: { status: "FAILED" }
            });
        }
    }
}
exports.default = new MpesaService();
