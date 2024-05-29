import React, { useEffect, useRef, useState } from "react";
import "./gallery.scss";
import { cars } from "../../utils";
import CarGallery from "./view";

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const scrollContainer = useRef(null);

  return (
    <div className="gallery-container">
      <div className="gallery-content" ref={scrollContainer}>
        {cars.map((car, index) => (
          <CarGallery
            data={car}
            key={index}
            currentIndex={currentIndex}
            prevIndex={prevIndex}
          />
        ))}
      </div>
      <GalleryFooter />
    </div>
  );
}

const GalleryFooter = () => {
  return (
    <div className="gallery-footer">
      <div className="">Company Info</div>
      <div className=""></div>
      <div className="brands">
        <i class="fa-brands fa-twitter"></i>
        <i class="fa-brands fa-facebook-f"></i>
        <i class="fa-brands fa-youtube"></i>
      </div>
    </div>
  );
};
