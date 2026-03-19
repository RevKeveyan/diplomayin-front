import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/userContext";
import { ToastProvider } from "./context/toastContext";
import "./style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { ChatProvider } from "./context/chatContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <ChatProvider>
            <App />
          </ChatProvider>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
