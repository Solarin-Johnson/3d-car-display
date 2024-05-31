import React, { useState } from "react";
import Image3d from "../../../components/3d";
import "./image.scss";

export default function GalleryImage({ src, fullscreen }) {
  const [state, setState] = useState(false);
  return (
    <div className="gallery-image">
      <div>
        <Image3d src={src} />
      </div>
      <div
        onClick={() => {
          fullscreen(!state);
          setState(!state);
        }}
        className={`gallery-explore ${state ? "hide" : ""}`}
      >
        Explore
      </div>
    </div>
  );
}
