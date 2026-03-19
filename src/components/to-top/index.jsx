import React from "react";
import { FaChevronUp } from "react-icons/fa";
import { useLocation } from "react-router-dom";

import "./style.scss";

const ScrollToTopButton = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  const scrollToHeader = () => {
    const header = document.getElementById("header");
    if (header) {
      header.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  if(isHomePage)
  return (
    <button className="scroll-button" onClick={scrollToHeader}>
      <FaChevronUp />
    </button>
  );
};

export default ScrollToTopButton;
