// const API_BASE_URL = "http://localhost:5000"; // your backend URL

// export const stkPush = async (phone: string, amount: number) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/mpesa/stkpush`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         phone,
//         amount,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error("STK push request failed");
//     }

//     const data = await response.json();
//     return data;

//   } catch (error) {
//     console.error("STK Push error:", error);
//     throw error;
//   }
// };