import { Request, Response } from "express";
import { stkPush } from "../services/mpesaService";
import prisma from "../config/prisma";

export const initiateSTK = async (req: Request, res: Response) => {
  const { phone, amount } = req.body;
  const response = await stkPush(phone, amount);

  await prisma.mpesaTransaction.create({
    data: {
      phone,
      amount,
      checkoutId: response.CheckoutRequestID,
      merchantReqId: response.MerchantRequestID,
    },
  });

  res.json(response);
};
export const mpesaCallback = async (req: Request, res: Response) => {
  const data = req.body.Body.stkCallback;

  await prisma.mpesaTransaction.update({
    where: { checkoutId: data.CheckoutRequestID },
    data: {
      status: data.ResultCode === 0 ? "SUCCESS" : "FAILED",
      resultCode: data.ResultCode,
      resultDesc: data.ResultDesc,
    },
  });

  res.json({ message: "ok" });
};