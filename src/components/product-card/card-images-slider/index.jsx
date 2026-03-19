import React, { useState } from 'react';
import { api } from '../../../helpers';
import './style.scss';

const ImageSlider = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const handleMouseMove = (e) => {
    const sliderWidth = e.currentTarget.offsetWidth;
    const mouseX = e.nativeEvent.offsetX; 
    const index = Math.floor((mouseX / sliderWidth) * images.length);
    setCurrentImage(index);
  };

  return (
    <div
      className="image-slider"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setCurrentImage(0)} 
    >
      <img
        src={`${api}${images[currentImage]}`}
        alt={`Product ${currentImage}`}
      />
    </div>
  );
};

export default ImageSlider;
