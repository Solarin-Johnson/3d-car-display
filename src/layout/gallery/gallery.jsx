import React, { useEffect, useRef, useState } from "react";
import "./gallery.scss";
import { cars } from "../../utils";
import CarGallery from "./view";
import GalleryFooter from "../footer";

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const scrollContainer = useRef(null);
  console.log(currentIndex, prevIndex);

  useEffect(() => {
    const scroll = scrollContainer.current;
    scroll.scrollTo({
      left: currentIndex * scroll.offsetHeight,
      behavior: "smooth",
    });
  }, [currentIndex]);

  return (
    <div className="gallery-container">
      <div className="gallery-content" ref={scrollContainer}>
        {cars.map((car, index) => (
          <CarGallery
            data={car}
            key={index}
            index={index}
            currentIndex={currentIndex}
            prevIndex={prevIndex}
          />
        ))}
      </div>
      <GalleryFooter
        current={(data) => setCurrentIndex(data)}
        previous={(data) => setPrevIndex(data)}
      />
    </div>
  );
}
