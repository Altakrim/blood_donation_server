const express = require("express");
const router = express.Router();
const Stripe = require("stripe");

// dotenv load (safe side)
require("dotenv").config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 🔹 Create Payment Intent
router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).send({ message: "Amount is required" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // taka → poisha
      currency: "bdt",
      payment_method_types: ["card"],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
