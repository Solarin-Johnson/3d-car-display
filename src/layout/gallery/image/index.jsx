import React, { useEffect, useState } from "react";
import Image3d from "../../../components/3d";
import "./image.scss";
import thumb from "../../../assets/ferrarri.webp";

export default function GalleryImage({ src, fullscreen, current }) {
  const [state, setState] = useState(false);

  useEffect(() => {
    const navBar = document.querySelectorAll(".nav-bar")[0];
    if (navBar) {
      navBar.lastChild.style.opacity = state ? "0" : "1";
      navBar.lastChild.style.visibility = "visible";
      setTimeout(() => {
        navBar.lastChild.style.visibility = state ? "hidden" : "visible";
      }, 400);
    }
  }, [state]);
  return (
    <div className={`gallery-image ${state ? "fullscreen" : "viewscreen"}`}>
      <div className={`gallery-image-close`}>
        <span
          onClick={() => {
            fullscreen(false);
            setState(false);
          }}
          class="material-symbols-rounded"
        >
          close
        </span>
      </div>
      <div className="car-image">
        {current && <Image3d src={src} state={state} />}
        <img src={thumb} id={state && "shrink"} alt="car" />
      </div>
      <div
        onClick={() => {
          fullscreen(true);
          setState(true);
        }}
        className={`gallery-explore ${state ? "hide" : ""}`}
      >
        Explore
      </div>
    </div>
  );
}
