import { api, cleanObject } from "../helpers";
import { useHttp } from "../hook/http.hook";
import { useToast } from "../context/toastContext";
import useBaseService from "./baseService";

const user = localStorage.getItem("user");
const userData = JSON.parse(localStorage.getItem("userData"));

const useUserService = () => {
  const { request, error, clearError, token } = useHttp();
  const { handleToast } = useToast();
  const { addData, updateData } = useBaseService();
  const accountRoute = `${api}/user`;
  // 🔥 Get user data by ID
  const getUserById = async (id) => {
    try {
      const res = await request(`${accountRoute}/${id}`, "GET");
      handleToast("success", res.message);
      localStorage.setItem("token", res.token);
    } catch (e) {
      handleToast("error", e.message);
    }
  };

  // 🔥 Register user
  const registerUser = async (data, isRegister) => {
    addData(data, accountRoute, isRegister);
  };

  // 🔥 Update user profile
  const updateUser = async (data) => {
    const route = `${accountRoute}/${user}`
    updateData(data, route);
  };

  // 🔥 Update user password
  const updatePassword = async (data) => {
    try {
      const res = await request(`${accountRoute}/${user}/change-password`, "PUT", JSON.stringify(cleanObject(data)));
      handleToast("success", res.message);
      localStorage.setItem("token", res.token);
    } catch (e) {
      handleToast("error", e.message);
    }
  };

  const updateAvatar = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await request(`${accountRoute}/${user}/avatar`, "PUT", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },});
      handleToast("success", res.message);
      localStorage.setItem("userData", JSON.stringify({...userData,avatar:res.user.avatar}));
    } catch (e) {
      handleToast("error", e.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      await request(`${accountRoute}/delete/${id}`, "DELETE");
      handleToast("success", "Account deleted successfully");
    } catch (e) {
      handleToast("error", e.message);
    }
  };

  return {
    error,
    registerUser,
    getUserById,
    updateUser,
    updatePassword,
    updateAvatar,
    deleteUser,
    clearError,
  };
};

export default useUserService;
