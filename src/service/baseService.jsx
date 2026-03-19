import { api, appendDataToFormData, cleanObject } from "../helpers";
import { useHttp } from "../hook/http.hook";
import { useToast } from "../context/toastContext";

const useBaseService = () => {
  const { loadingStatus, request, error, clearError, setProcess, token } =
    useHttp();

  const { handleToast } = useToast();


  const getById = async (id, route) => {
    try {
      const res = await request(`${route}/${id}`, "GET");

      handleToast("success", res.message);
    } catch (e) {
      handleToast("error", e.message);
    }
  };

  const addData = async (data, route, isRegister) => {
    let formData = {};
    if(data.images){
      formData = new FormData();
      for (let i = 0; i < data.images.length; i++) {
        formData.append("images", data.images[i]); // Append images
      }
      
    }
    
    let newData = data.image || data.images ? formData : JSON.stringify(cleanObject(data));
    
    const headers = data.image || data.images ? { "Content-Type": "multipart/form-data" } : { "Content-Type": "application/json" };
  
    try {
      const res = await request(`${route}`, "POST", newData, {
        Authorization: `Bearer ${token}`,
        ...headers,
      });
      // handleToast("success", res.message);
      isRegister(false)
    } catch (e) {
      handleToast("error", e.message);
    }
  };
  

  const updateData = async (data, route) => {
    try {
      const res = await request(
        `${route}/`,
        "PUT",
        JSON.stringify(cleanObject(data))
      );

      handleToast("success", res.message);
    } catch (e) {
      handleToast("error", e.message);
    }
  };

  const deleteData = async (id, route) => {
    try {
      const res = await request(`${route}/delete/${id}`, "DELETE");

      handleToast("success", res.message);
    } catch (e) {
      handleToast("error", e.message);
    }
  };

  return {
    loadingStatus,
    error,
    getById,
    addData,
    updateData,
    deleteData,
    setProcess,
    clearError,
  };
};

export default useBaseService;
