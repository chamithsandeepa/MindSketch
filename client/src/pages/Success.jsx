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
    <div className="text-center mt-20">
      <h2 className="text-2xl">Processing your payment...</h2>
    </div>
  );
};

export default Success;
