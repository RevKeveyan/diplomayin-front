import React, { useEffect, useState, lazy, Suspense } from "react";
import Footer from "./components/footer";
import MyNavbar from "./components/header";
import HomePage from "./page/home";
import CartPage from "./page/cart";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Background from "./components/background";
import UserPage from "./page/user-profile";
import AddProduct from "./components/add-product";
import AuthPage from "./page/login";
import AddPage from "./page/add-product";
import ProductPage from "./page/product-page";
import ChatWidget from "./components/chat/chat-widget";
import ScrollToTopButton from "./components/to-top";
import { useToast } from "./context/toastContext";
import { useAuth } from "./context/userContext";
import { Toast } from "react-bootstrap";

const App = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [authChecked, setAuthChecked] = useState(false); // 👈 Новый флаг
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("userData"));
  const token = localStorage.getItem("token");

  const {
    showToast,
    setShowToast,
    toastStatus,
    toastMessage,
    handleClose,
    handleToast,
  } = useToast();

  useEffect(() => {
    if (token && user?.id) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setAuthChecked(true); 
  }, []);

  const onSubmit = (data) => {
    setSearch(data.search);
    navigate(`/home`);
  };

  const restrictedRoutes = [
    "/profile",
    "/cart",
    "/add-product",
    "/post-product",
  ];
  useEffect(() => {
    if (
      authChecked &&
      !isLoggedIn &&
      restrictedRoutes.includes(location.pathname)
    ) {
      handleToast("warning", "Please login to access this page.");
      navigate("/login");
    }
  }, [authChecked, isLoggedIn, location.pathname]);

  const Footer = lazy(() => import("./components/footer"));
  if (!authChecked) return null;

  return (
    <>
      <Background />
      <MyNavbar onSubmit={onSubmit} setCategory={setCategory} />
      {location.pathname === "/home" && <ScrollToTopButton />}

      <Routes>
        <Route
          path="/home"
          element={
            <HomePage
              search={search}
              setSearch={setSearch}
              category={category}
            />
          }
        />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/:id" element={<ProductPage />} />

        {isLoggedIn && (
          <>
            <Route path="/profile" element={<UserPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/edit-product/:id" element={<AddProduct />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/post-product" element={<AddPage />} />
          </>
        )}

        <Route path="*" element={<HomePage />} />
      </Routes>

      {user?.id && <ChatWidget userId={user.id} />}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      {showToast && (
        <Toast
          status={toastStatus}
          message={toastMessage}
          onClose={handleClose}
          showToast={showToast}
          setShowToast={setShowToast}
        />
      )}
    </>
  );
};

export default App;
