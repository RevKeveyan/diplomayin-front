import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { api } from '../../../helpers';

import "./style.scss"; 


const ImageinPageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageChange = (index) => {
    setCurrentIndex(index);
  };
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };


  return (
    <div className="prod-image-slider">
      <div className="main-image-container">
        <motion.img
          key={currentIndex}
          src={`${images[0].search("data:") !== 0 ? api : ""}${images[currentIndex]}`}
          alt={`Product ${currentIndex + 1}`}
          className="main-image"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
        <button className="slider-btn prev-btn" onClick={handlePrev}>
          <FaChevronLeft />
        </button>
        <button className="slider-btn next-btn" onClick={handleNext}>
          <FaChevronRight />
        </button>
      </div>

      <div className="thumbnails-container">
        {images?.map((image, index) => (
          <div
            key={index}
            className={`thumbnail ${index === currentIndex ? "active" : ""}`}
            onClick={() => handleImageChange(index)}
          >
            <img src={`${images[0].search("data:") !== 0 ? api : ""}${image}`} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageinPageSlider;
