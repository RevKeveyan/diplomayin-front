import { api } from "../helpers";
import { useHttp } from "../hook/http.hook";
import { useAuth } from "../context/userContext";
import { useToast } from "../context/toastContext";

const useAuthService = () => {
  const {
    loadingStatus,
    request,
    error,
    clearError,
    setProcess,
  } = useHttp();


  const { setIsLoggedIn, setUser } = useAuth();
  const { handleToast } = useToast();



  const authRoute = `${api}/auth`;


  const resetCode = async (data, setStep) => {
    try {
      const res = await request(
        `${authRoute}/reset-password`,
        "POST",
        JSON.stringify(data)
      );
      // handleToast("success", "Welcome Back");
      localStorage.setItem("token", res.token);
    } catch (e) {
      setStep(1)
      handleToast("error", e.message);
    }
  };

  const getCode = async (data,setStep) => {
    try {
      const res = await request(
        `${authRoute}/get-code`,
        "POST",
        JSON.stringify(data)
      );
      // handleToast("success", "Welcome Back");
      setStep(2)
      localStorage.setItem("token", res.token);
    } catch (e) {
      handleToast("error", e.message);
    }
  };


  const login = async (data,) => {
    try {
      const res = await request(
        `${authRoute}/login`,
        "PUT",
        JSON.stringify(data)
      );
      localStorage.setItem("token", res.userData.token);
      localStorage.setItem("user", res.userData.id);
      localStorage.setItem("userData", JSON.stringify(res.userData));
  
      setUser(res.userData);  // Убедимся, что тут устанавливаем userData, как в localStorage
      setIsLoggedIn(true);
  
      handleToast("success", "Welcome Back");
  
      // Навигация и перезагрузка
      window.location.href = "/home";  // Перейти и обновить главную страницу
  
    } catch (e) {
      handleToast("error", e.message);
    }
  };
  
  const logout = () => {
    localStorage.clear();
    handleToast("success", "Successfully logged out");
    setTimeout(() => {
      window.location.reload();
    }, 500); // Немного подождём, чтобы показать toast
  };

  return {
    loadingStatus,

    error,
    resetCode,
    getCode,
    login,
    logout,
    setProcess,
    clearError,
  };
};

export default useAuthService;
