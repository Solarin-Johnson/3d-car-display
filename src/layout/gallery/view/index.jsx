import { useEffect, useState } from "react";
import GalleryImage from "../image";
import "./view.scss";

export default function CarGallery({
  data,
  index,
  currentIndex,
  prevIndex,
  full,
}) {
  const state =
    index === currentIndex ? "current" : index === prevIndex ? "past" : "";
  const stateInv = index < currentIndex ? "prev" : "next";
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <div
      className={`gallery-view ${state} ${stateInv} ${
        fullscreen ? "fullscreen" : ""
      }`}
    >
      <div className="gallery-hero-container">
        <GalleryHero name={data.name} description={data.description} />
        <GalleryRatings />
      </div>
      <GalleryImage
        src={data.src}
        current={index === currentIndex}
        fullscreen={(data) => {
          setFullscreen(data);
          full(data);
        }}
      />
      <div className="gallery-specs-container">
        <div className="gallery-specs">
          <GallerySpecs specs={data.specs} />
        </div>
      </div>
    </div>
  );
}

const GalleryHero = ({ name, description }) => {
  return (
    <div className="gallery-hero">
      <div className="gallery-name">{name}</div>
      <div className="gallery-desc">{description}</div>
    </div>
  );
};

const GalleryRatings = ({ ratings }) => {
  return (
    <div className="gallery-ratings">
      <div className="gallery-rating">{ratings}</div>
      <div className="gallery-stars"> ★★★★☆</div>
    </div>
  );
};

const GallerySpecs = ({ specs }) => {
  return (
    <>
      {specs.map((spec, index) => (
        <div index={index} className="gallery-spec">
          <div className="gallery-spec-bullet"></div>
          <div className="gallery-spec-value">{spec.value}</div>
        </div>
      ))}
    </>
  );
};
