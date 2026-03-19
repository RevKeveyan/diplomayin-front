import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { api } from "../helpers";
const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};



const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("token");

  const location = useLocation();
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  const getUser = async() =>{
    await axios
       .get(`${api}/auth/me`, {
         headers: {   Authorization: `Bearer ${token}` },
       })
       .then((res) => {
        localStorage.setItem("user", res.data.id);
        localStorage.setItem("userData", JSON.stringify(res.data));

        setUser(res.id);
       })
       .catch((error) => {
         localStorage.clear();
         setIsLoggedIn(false);
       });
 }

useEffect(() => {
    getUser()
    
}, [location.pathname]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );

  
};

export { AuthProvider, useAuth };

