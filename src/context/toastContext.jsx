import { createContext, useContext, useEffect, useState } from "react";
import { Toast } from "../components/toast"; // Импортируем Toast компонент

const ToastContext = createContext();

const useToast = () => {
  return useContext(ToastContext);
};

const ToastProvider = ({ children }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastStatus, setToastStatus] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const handleClose = () => {
    setShowToast(false);
  };

  const handleToast = (status, message) => {
    setToastStatus(status);
    setToastMessage(message);
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ handleToast }}>
      {children}
      <Toast 
        status={toastStatus} 
        message={toastMessage} 
        showToast={showToast} 
        setShowToast={setShowToast} 
        onClose={handleClose} 
      />
    </ToastContext.Provider>
  );
};

export { ToastProvider, useToast };
