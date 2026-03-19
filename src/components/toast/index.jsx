import React, { useState, useEffect } from "react";
import "./style.scss";

export const Toast = ({ status, message, onClose, showToast, setShowToast }) => {



  const handleClose = () => {
    setShowToast(false);
    onClose();
  };

  return (
    <div className={`toast ${status} ${showToast ? "show" : "hide"}`}>
      <div className="toast__message">{message}</div>
      <button className="toast__close" onClick={handleClose}>
        &times;
      </button>
    </div>
  );
};

