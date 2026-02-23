import axios from "axios";
import prisma from "../prismaClient";
import { getAccessToken } from "../utils/darajaAuth";
import { getTimestamp } from "../utils/timestamp";

const BASE_URL = "http://localhost:5000"; // backend URL

export const stkPush = async (data: any) => {
  const res = await fetch(`${BASE_URL}/mpesa/stkpush`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
class MpesaService {

  async stkPush(phone: string, amount: number) {

    const token = await getAccessToken();

    const shortcode = process.env.MPESA_SHORTCODE!;
    const passkey = process.env.MPESA_PASSKEY!;
    const timestamp = getTimestamp();

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

    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const checkoutRequestId = response.data.CheckoutRequestID;

    await prisma.mpesaTransaction.create({

      data: {

        phone,

        amount,

        checkoutRequestId,

        status: "PENDING",
      }
    });

    return response.data;
  }


  async handleCallback(callbackBody: any) {

    const stk = callbackBody.Body.stkCallback;

    const checkoutRequestId = stk.CheckoutRequestID;

    if (stk.ResultCode === 0) {

      const receipt =
        stk.CallbackMetadata.Item.find(
          (item: any) => item.Name === "MpesaReceiptNumber"
        ).Value;

      await prisma.mpesaTransaction.update({

        where: { checkoutRequestId },

        data: {

          status: "SUCCESS",

          mpesaReceiptNumber: receipt,
        }
      });

    } else {

      await prisma.mpesaTransaction.update({

        where: { checkoutRequestId },

        data: { status: "FAILED" }
      });
    }
  }
}

export default new MpesaService();