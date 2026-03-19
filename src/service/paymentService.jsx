import { api, cleanObject } from "../helpers";
import { useHttp } from "../hook/http.hook";
import { useToast } from "../context/toastContext";

const user = localStorage.getItem("user");

const usePaymentService = () => {
  const { request, error, clearError } = useHttp();
  const { handleToast } = useToast();
  const paymentRoute = `${api}/payment`;

  // 🔥 Get user payment details
  const getUserPayments = async (setPayments) => {
    try {
      const res = await request(`${paymentRoute}/${user}`, "GET");
      setPayments(res.payments);
    } catch (e) {
      handleToast("error", e.message);
    }
  };
  const addPayment = async (data) => {
    try {
      const res = await request(`${paymentRoute}/${user}`, "POST", JSON.stringify(cleanObject(data)));
      handleToast("success", res.message);
      
    } catch (e) {
      handleToast("error", e.message);
    }
  };

  // 🔥 Update or add payment details
  const updatePaymentDetails = async (data) => {
    try {
      const res = await request(`${paymentRoute}/${user}`, "PUT", JSON.stringify(cleanObject(data)));
      handleToast("success", res.message);
    } catch (e) {
      handleToast("error", e.message);
    }
  };

  return {
    error,
    addPayment,
    getUserPayments,
    updatePaymentDetails,
    clearError,
  };
};

export default usePaymentService;
