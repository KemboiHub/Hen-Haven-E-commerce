import { Request, Response } from "express";
import mpesaService from "../services/mpesaService";

export const stkPush = async (req: Request, res: Response) => {

  try {

    const { phone, amount } = req.body;

    const result = await mpesaService.stkPush(phone, amount);

    res.json(result);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "STK push failed"
    });
  }
};


export const mpesaCallback = async (req: Request, res: Response) => {

  try {

  await mpesaService.handleCallback(req.body);

  res.json({ ResultCode: 0 });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Callback failed"
    });
  }
};