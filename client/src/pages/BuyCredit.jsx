import React, { useContext } from "react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Zap } from "lucide-react";

const BuyCredit = () => {
  const { user, backendUrl, token, setShowLogin } = useContext(AppContext);

  const paymentStripe = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true);
        return;
      }

      const { data } = await axios.post(
        backendUrl + "/api/user/payment-stripe",
        { planId },
        { headers: { token } } // your userAuth expects headers.token
      );

      if (data.success) {
        const stripe = await loadStripe(
          import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
        );
        await stripe.redirectToCheckout({ sessionId: data.sessionId });
      } else {
        toast.error(data.message || "Payment failed to initialize");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Payment error. Try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="min-h-[80vh] text-center pt-14 mb-10"
    >
      <h1 className="text-3xl font-medium mb-6 text-gray-100">
        Choose Your Plan
      </h1>
      <div className="flex flex-wrap justify-center gap-6 text-left">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-gray-900/95 border border-purple-500/30 backdrop-blur-sm drop-shadow-lg rounded-lg py-12 px-8 text-gray-300 hover:scale-105 hover:border-purple-400/50 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-500"
          >
            <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center border border-purple-500/30 mb-4">
              <Zap size={24} className="text-purple-400" />
            </div>
            <p className="mt-3 mb-1 font-semibold text-gray-100">{plan.id}</p>
            <p className="text-sm text-gray-400">{plan.desc}</p>
            <p className="mt-6 text-gray-200">
              <span className="text-3xl font-medium text-purple-400">
                Rs.{plan.price}
              </span>{" "}
              <span className="text-gray-400">/ {plan.credits} credits</span>
            </p>
            <button
              onClick={() => paymentStripe(plan.id)}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white mt-8 text-sm rounded-md py-2.5 min-w-52 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
            >
              {user ? "Buy Now" : "Get Started"}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BuyCredit;
