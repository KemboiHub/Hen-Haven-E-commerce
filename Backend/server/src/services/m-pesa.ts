import axios from 'axios';
import qs from 'qs';

let cachedToken: { token: string; expiresAt: number } | null = null;

export const getAccessToken = async () => {
  if (cachedToken && cachedToken.expiresAt > Date.now()) return cachedToken.token;
  const key = process.env.DARAJA_CONSUMER_KEY || '';
  const secret = process.env.DARAJA_CONSUMER_SECRET || '';
  const auth = Buffer.from(`${key}:${secret}`).toString('base64');
  const url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
  const resp = await axios.get(url, { headers: { Authorization: `Basic ${auth}` } });
  const token = resp.data.access_token;
  cachedToken = { token, expiresAt: Date.now() + 3500 * 1000 };
  return token;
};

export const stkPush = async ({ phone, amount, accountReference }: { phone: string; amount: number; accountReference: string; }) => {
  const token = await getAccessToken();
  const url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14); // YYYYMMDDHHmmss like
  const shortCode = process.env.DARAJA_SHORTCODE || '174379';
  const passKey = process.env.DARAJA_PASSKEY || 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';
  const password = Buffer.from(shortCode + passKey + timestamp).toString('base64');

  const body = {
    BusinessShortCode: shortCode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: amount,
    PartyA: phone,
    PartyB: shortCode,
    PhoneNumber: phone,
    CallBackURL: process.env.DARAJA_CALLBACK_URL,
    AccountReference: accountReference,
    TransactionDesc: 'Hen Haven order'
  };

  const resp = await axios.post(url, body, { headers: { Authorization: `Bearer ${token}` } });
  return resp.data;
};
