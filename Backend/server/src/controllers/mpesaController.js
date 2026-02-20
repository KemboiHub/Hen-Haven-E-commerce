const mpesaService = require("../services/mpesaService");

const stkPush = async (req, res) => {
  try {

    const { phone, amount, accountReference } = req.body;

    if (!phone || !amount) {
      return res.status(400).json({
        success: false,
        message: "Phone and amount required",
      });
    }

    const result = await mpesaService.stkPush(
      phone,
      amount,
      accountReference
    );

    res.json({
      success: true,
      message: "STK Push sent",
      CheckoutRequestID: result.CheckoutRequestID,
    });

  } catch (error) {

    console.error(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "STK Push failed",
    });
  }
};

module.exports = {
  stkPush,
};