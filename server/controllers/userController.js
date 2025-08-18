import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Stripe from "stripe";
import transactionModel from "../models/transactionModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token, user: { name: user.name } });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Login a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.json({ success: false, message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token, user: { name: user.name } });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get user credits
const userCredits = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    res.json({
      success: true,
      credits: user.creditBalance,
      user: { name: user.name },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Create Stripe Checkout Session
const paymentStripe = async (req, res) => {
  try {
    const userId = req.userId;
    const { planId } = req.body;

    if (!planId)
      return res.json({ success: false, message: "Plan is required" });

    let credits, planName, amount;
    switch (planId) {
      case "Basic":
        planName = "Basic Plan";
        credits = 100;
        amount = 200; // LKR
        break;
      case "Advanced":
        planName = "Advanced Plan";
        credits = 500;
        amount = 1000; // LKR
        break;
      case "Business":
        planName = "Business Plan";
        credits = 5000;
        amount = 5000; // LKR
        break;
      default:
        return res.json({ success: false, message: "Plan not found" });
    }

    const transaction = await transactionModel.create({
      userId,
      plan: planName,
      credits,
      amount,
      payment: false,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: process.env.CURRENCY || "lkr",
            product_data: { name: planName },
            unit_amount: amount * 100, // LKR uses 2 decimals in Stripe, so multiply by 100
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      // 🔴 IMPORTANT: include {CHECKOUT_SESSION_ID} so you can verify later
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}&transactionId=${transaction._id}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ success: true, sessionId: session.id });
  } catch (error) {
    console.error("Stripe Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// Verify payment after redirect
const verifyStripe = async (req, res) => {
  try {
    const { sessionId, transactionId } = req.body;

    if (!sessionId) {
      return res.json({ success: false, message: "Missing sessionId" });
    }
    if (!transactionId) {
      return res.json({ success: false, message: "Missing transactionId" });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const transaction = await transactionModel.findById(transactionId);
      if (!transaction) {
        return res.json({ success: false, message: "Transaction not found" });
      }
      if (transaction.payment) {
        // already processed
        return res.json({ success: true, message: "Already verified" });
      }

      transaction.payment = true;
      await transaction.save();

      await userModel.findByIdAndUpdate(transaction.userId, {
        $inc: { creditBalance: transaction.credits },
      });

      return res.json({ success: true, message: "Payment successful" });
    }

    res.json({ success: false, message: "Payment not completed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { registerUser, loginUser, userCredits, paymentStripe, verifyStripe };
