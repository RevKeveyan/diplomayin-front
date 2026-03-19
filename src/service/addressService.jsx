import { api } from "../helpers";
import { useHttp } from "../hook/http.hook";
import { useToast } from "../context/toastContext";

const user = localStorage.getItem("user");

const useAddressService = () => {
  const { request, error, clearError } = useHttp();
  const { handleToast } = useToast();
  const accountRoute = `${api}/address`;

  // 🔥 Get all user addresses
  const getUserAddresses = async (setAddresses) => {
    try {
      const res = await request(`${accountRoute}/${user}`, "GET");
      setAddresses(res.addresses);
    } catch (e) {
      handleToast("error", e.message);
    }
  };

  // 🔥 Add a new address
  const addAddress = async (data) => {
    try {
      const res = await request(`${accountRoute}/${user}`, "POST", JSON.stringify(data));
      handleToast("success", res.message);
      return res.address;
    } catch (e) {
      handleToast("error", e.message);
    }
  };

  // 🔥 Update an existing address
  const updateAddress = async (id, data) => {
    try {
      const res = await request(`${accountRoute}/${id}`, "PUT", JSON.stringify(data));
      handleToast("success", res.message);
      return res.address;
    } catch (e) {
      handleToast("error", e.message);
    }
  };

  // 🔥 Delete an address
  const deleteAddress = async (id) => {
    try {
      await request(`${accountRoute}/${id}`, "DELETE");
      handleToast("success", "Address deleted successfully");
    } catch (e) {
      handleToast("error", e.message);
    }
  };

  return {
    error,
    getUserAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    clearError,
  };
};

export default useAddressService;
