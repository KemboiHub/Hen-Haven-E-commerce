const API_BASE_URL = "http://localhost:5000/api";

export interface StkPushPayload {
  phone: string;
  amount: number;
  accountReference: string;
}

export interface StkPushResponse {
  success: boolean;
  message: string;
  CheckoutRequestID?: string;
}

class MpesaService {
  async initiateSTKPush(payload: StkPushPayload): Promise<StkPushResponse> {
    try {
      const res = await fetch("/mpesa/stkpush", {
      const response = await fetch(`${API_BASE_URL}/mpesa/stkpush`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      return await response.json();

    } catch (error: any) {
      console.error("MPESA STK Push Error:", error);

      return {
        success: false,
        message: error.message || "Payment failed",
      };
    }
  }
}

export default new MpesaService();