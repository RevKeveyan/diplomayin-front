import { api, appendDataToFormData, cleanObject } from "../helpers";
import { useToast } from "../context/toastContext";
import { useHttp } from "../hook/http.hook";
import useBaseService from "./baseService";
import axios from "axios";

const user = localStorage.getItem("user");

const useProductService = () => {
  const { loadingStatus, setLoadingStatus, request, error, clearError, setProcess, token } =
    useHttp();
  const { handleToast } = useToast();
  const productRoute = `${api}/products`;

  const { addData, updateData } = useBaseService();

  // 🔥 Получение товаров (с `loadingStatus`)
  const getProducts = async (
    setProducts,
    setTotalPages,
    filters = {},
    page = 1,
    limit = 12,
    sortOption = "default",
    search,
    category = 'all'
  ) => {
    const cleanedFilter = cleanObject({ 
        ...filters, 
        category, 
        userId: user
    });

    const queryString = new URLSearchParams(cleanedFilter).toString();
    let url = `${productRoute}/?page=${page}&limit=${limit}&sortOption=${sortOption}&${queryString}`;

    if (search) {
        url += `&search=${search}`;
    }

    try {
        setLoadingStatus("loading");
        const res = await request(url, "GET");
        setTotalPages(res.totalPages);
        setProducts(res.items);
        setLoadingStatus("loaded");
        // handleToast("success", "Products retrieved successfully");
    } catch (e) {
        setLoadingStatus("error");
        // handleToast("error", e.message);
    }
  };

  // 🔥 Добавление товара (с `loadingStatus`)
  const addProduct = async (data) => {
    if (!user) {
      handleToast("error", "Login first");
      return;
    }

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key !== "images") {
        formData.append(key, data[key]);
      }
    });

    if (data.images && data.images.length > 0) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append("images", data.images[i]); 
      }
    } else {
      handleToast("error", "Image required");
      return;
    }

    try {
      setLoadingStatus("pending");

      const res = await axios.post(`${productRoute}/add/${user}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setLoadingStatus("loaded");
      handleToast("success", res.data.message);
    } catch (e) {
      setLoadingStatus("error");
      handleToast("error", e.response?.data?.message );
    }
  };

  // 🔥 Получение товара по ID (с `loadingStatus`)
  const getProductById = async (id, setProduct) => {
    try {
      setLoadingStatus("pending");
      const res = await request(`${productRoute}/${id}`, "GET");
      setProduct(res.product);
      setLoadingStatus("loaded");
      // handleToast("success", "Product retrieved successfully");
    } catch (e) {
      setLoadingStatus("error");
      // handleToast("error", e.message);
    }
  };

  // 🔹 Получение рекомендованных товаров (без `loadingStatus`)
  const getRecommendedProducts = async (setProducts, category) => {
    try {
      const url = new URL(`${productRoute}/${user}/recommended`);
      if (category) url.searchParams.append("category", category);

      const res = await request(url.toString(), "GET");
      setProducts(res.recommendedProducts);
      // handleToast("success", "Recommended products retrieved");
    } catch (e) {
      // handleToast("error", e.message);
    }
  };
 
  // 🔹 Лайк (без `loadingStatus`)
  const likeProduct = async (data) => { 
    try {
      const res = await request(`${productRoute}/like`, "POST", JSON.stringify(data));
      // handleToast("success", "Product liked successfully");
    } catch (e) {
      // handleToast("error", e.message);
    }
  };

  // 🔹 Получение избранных товаров (без `loadingStatus`)
  const getLikedProducts = async (setProducts, category) => {
    try {
        const url = new URL(`${productRoute}/${user}/liked`);
        if (category) url.searchParams.append("category", category);

        const res = await request(url.toString(), "GET");
        setProducts(res.likedProductIds);
        // handleToast("success", "Liked products retrieved");
    } catch (e) {
        // handleToast("error", e.message);
    }
  };

  // 🔹 Получение товаров со скидкой (без `loadingStatus`)
  const getDiscountedProducts = async (setProducts, category) => {
    try {
      const url = new URL(`${productRoute}/${user}/discounted`);
      if (category && category !== "all" && category !== "other") {
        url.searchParams.append("category", category);
      }

      const res = await request(url.toString(), "GET");
      setProducts(res.discountedProducts);
    } catch (e) {
    }
  };

  // 🔹 Редактирование товара (без `loadingStatus`)
  const editProduct = async (data, id) => {
    try {
      const formData = new FormData();
  
      Object.keys(data).forEach((key) => {
        if (key !== "images") {
          formData.append(key, data[key]);
        }
      });
  
      if (data.images && data.images.length > 0) {
        for (let i = 0; i < data.images.length; i++) {
          formData.append("images", data.images[i]);
        }
      }
  
      await axios.put(`${productRoute}/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
  
      handleToast("success", "Product updated successfully");
    } catch (e) {
      handleToast("error", e.response?.data?.message || "Error updating product");
    }
  };
  

  // 🔹 Удаление товара (без `loadingStatus`)
  const deleteProduct = async (id) => {
    try {
      const res = await request(`${productRoute}/${id}`, "DELETE");
      handleToast("success", res.message || "Product deleted successfully");
    } catch (e) {
      handleToast("error", e.message);
    }
  };

  return {
    loadingStatus,
    error,
    addProduct,
    getProducts,
    getRecommendedProducts,
    getLikedProducts,
    getDiscountedProducts,
    getProductById,
    editProduct,
    likeProduct,
    deleteProduct,
    setProcess,
    clearError,
  };
};

export default useProductService;
