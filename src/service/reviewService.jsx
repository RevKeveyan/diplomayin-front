import { api } from "../helpers";
import { useHttp } from "../hook/http.hook";
import { useToast } from "../context/toastContext";
const user = localStorage.getItem("user");

const useReviewService = () => {
  const { loadingStatus, request, error, clearError, setProcess } = useHttp();
  const { handleToast } = useToast();

  const reviewRoute = `${api}/reviews`;

  const getReviewsByProduct = async (productId, setReviews) => {
    try {
      const res = await request(`${reviewRoute}/product/${productId}`, "GET");
      setReviews(res.reviews);
    } catch (e) {
      // handleToast("error", e.message);
    }
  };

  const getReviewsBySeller = async (setReviews) => {
    try {
      const res = await request(`${reviewRoute}/seller/${user}`, "GET");
      setReviews(res.reviews);
    } catch (e) {
      // handleToast("error", e.message);
    }
  };

  const addReview = async (reviewData) => {
    try {
      const res = await request(`${reviewRoute}/add`, "POST", JSON.stringify(reviewData));
      // handleToast("success", "Review submitted successfully!");
      return res;
    } catch (e) {
      // handleToast("error", e.message);
    }
  };
  
  const getUserStats = async (setStats) => {
    try {
      const res = await request(`${reviewRoute}/stats/${user}`, "GET");
      setStats(res);
    } catch (e) {
      // handleToast("error", e.message);
    }
  };

  const deleteReview = async (id) => {
    try {
      const res = await request(`${reviewRoute}/delete/${id}`, "DELETE");
      // handleToast("success", "Review deleted successfully!");
      return res;
    } catch (e) {
      // handleToast("error", e.message);
    }
  };

  return {
    loadingStatus,
    error,
    getReviewsByProduct,
    getReviewsBySeller,
    addReview,
    deleteReview,
    getUserStats,
    clearError,
    setProcess,
  };
};

export default useReviewService;
