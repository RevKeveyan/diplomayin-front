import { api } from "../helpers";
import { useHttp } from "../hook/http.hook";
import { useToast } from "../context/toastContext";
import useBaseService from "./baseService";
const user = localStorage.getItem("user");

const useOrderService = () => {
  const { loadingStatus, request, error, clearError, setProcess } = useHttp();
  const { handleToast } = useToast();
  const baseService = useBaseService();

  const orderRoute = `${api}/orders`;

  const createOrder = async (orderData) => {
    try {
      const res = await request(
        `${orderRoute}/create`,
        "POST",
        JSON.stringify(orderData)
      );
      handleToast("success", "Order created successfully!");
      return res;
    } catch (e) {
      handleToast("error", e.message);
    }
  };

  const offerOrder = async (orderData) => {
    try {
      const res = await request(
        `${orderRoute}/offer`,
        "POST",
        JSON.stringify(orderData)
      );
      handleToast("success", "Order created successfully!");
      return res;
    } catch (e) {
      handleToast("error", e.message);
    }
  };
  const getUserOrders = async (setOrders, status = "") => {
    try {
      const query = status ? `?status=${status}` : "";
      const res = await request(`${orderRoute}/user-orders${query}`, "GET");
      setOrders(res.orders);
    } catch (e) {
      handleToast("error", e.message);
    }
  };

  const getOrdersBySellerId = async (setOrders, status = "") => {
    try {
      const query = status ? `?status=${status}` : "";
      const res = await request(`${orderRoute}/seller/${user}${query}`, "GET");
      setOrders(res.orders);
    } catch (e) {
      handleToast("error", e.message);
    }
  };

  const getOrderById = async (id) => {
    return await baseService.getById(id, orderRoute);
  };

  const updateOrderStatus = async (id, status) => {
    try {
      const res = await request(
        `${orderRoute}/${id}/update-status`,
        "PUT",
        JSON.stringify({ status })
      );
      handleToast("success", "Order status updated!");
      return res;
    } catch (e) {
      handleToast("error", e.message);
    }
  };

  const cancelOrder = async (id, reason, onHide) => {
    try {
      const res = await request(
        `${orderRoute}/${id}/cancel`,
        "PUT",
        JSON.stringify({ reason })
      );
      handleToast("success", "Order canceled successfully!");
      onHide();

      return res;
    } catch (e) {
      handleToast("error", e.message);
    }
  };

  const confirmOrderReceived = async (id) => {
    try {
      const res = await request(`${orderRoute}/${id}/confirm-received`, "PUT");
      handleToast("success", "Order marked as completed!");
      return res;
    } catch (e) {
      handleToast("error", e.message);
    }
  };

  const getAllOrders = async () => {
    try {
      const res = await request(`${orderRoute}/all-orders`, "GET");
      return res.orders;
    } catch (e) {
      handleToast("error", e.message);
    }
  };

  return {
    loadingStatus,
    error,
    createOrder,
    getUserOrders,
    getOrderById,
    updateOrderStatus,
    getOrdersBySellerId,
    cancelOrder,
    confirmOrderReceived,
    getAllOrders,
    offerOrder,
    clearError,
    setProcess,
  };
};

export default useOrderService;
