import { useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const Success = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { token, loadCreditsData } = useContext(AppContext); // ✅ loadCreditsData

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const sessionId = searchParams.get("session_id");
        const transactionId = searchParams.get("transactionId");

        if (!sessionId || !transactionId) {
          toast.error("Missing payment information");
          return navigate("/");
        }

        const { data } = await axios.post(
          import.meta.env.VITE_BACKEND_URL + "/api/user/verify-stripe",
          { sessionId, transactionId },
          { headers: { token } } // ✅ send token
        );

        if (data.success) {
          toast.success("Credits added to your account!");
          await loadCreditsData(); // ✅ refresh user credits immediately
        } else {
          toast.error(data.message || "Verification failed");
        }

        setTimeout(() => navigate("/"), 2000);
      } catch (error) {
        toast.error(error.message || "Verification error");
        navigate("/");
      }
    };

    verifyPayment();
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center">
      <div className="bg-gray-900/95 border border-purple-500/30 backdrop-blur-sm rounded-xl p-12 max-w-md w-full mx-4">
        <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-purple-500/30">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h2 className="text-2xl font-medium text-gray-100 mb-3">
          Processing your payment...
        </h2>
        <p className="text-gray-400 text-sm">
          Please wait while we verify your transaction and add credits to your
          account.
        </p>
      </div>
    </div>
  );
};

export default Success;
