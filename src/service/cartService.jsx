import { api, appendDataToFormData, cleanObject } from "../helpers";
import { useToast } from "../context/toastContext";
import { useHttp } from "../hook/http.hook";
import useBaseService from "./baseService";
const user = localStorage.getItem("user");

const useCartService = () => {
  const { loadingStatus, setLoadingStatus, request, error, clearError, setProcess } = useHttp();
  const { handleToast } = useToast();
  const cartRoute = `${api}/cart`;

  const { addData, updateData } = useBaseService();

  // 🔥 Добавление в корзину (с `loadingStatus`)
  const addToCart = async (data) => {
    try {
      setLoadingStatus("pending");
      const res = await request(
        `${cartRoute}/${user}/add`,
        "POST",
        JSON.stringify(data)
      );
      setLoadingStatus("loaded");
      handleToast("success", "Product added to cart");
    } catch (e) {
      setLoadingStatus("error");
      handleToast("error", e.message);
    }
  };

  // 🔥 Получение товаров в корзине (с `loadingStatus`)
  const getCartItems = async (setProducts) => {
    try {
      setLoadingStatus("pending");
      const res = await request(`${cartRoute}/${user}/`, "GET");
      setProducts(res.cart.products);
      setLoadingStatus("loaded");
      // handleToast("success", "Cart items retrieved successfully");
    } catch (e) {
      setLoadingStatus("error");
      // handleToast("error", e.message);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      setLoadingStatus("pending");
      const res = await request(
        `${cartRoute}/remove`,
        "POST",
        JSON.stringify({productId})
      );
      setLoadingStatus("loaded");
      handleToast("success", "Product removed from cart");
    } catch (e) {
      setLoadingStatus("error");
      handleToast("error", e.message);
    }
  };
  

  return {
    loadingStatus,
    error,
    addToCart,
    removeFromCart,
    getCartItems,
    setProcess,
    clearError,
  };
};

export default useCartService;
