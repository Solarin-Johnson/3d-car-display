import { useEffect, useRef, useState } from "react";
import "./footer.scss";

export default function GalleryFooter() {
  return (
    <div className="gallery-footer">
      <div className="">Company Info</div>
      <FooterNav />
      <div className="brands">
        <i class="fa-brands fa-twitter"></i>
        <i class="fa-brands fa-facebook-f"></i>
        <i class="fa-brands fa-youtube"></i>
      </div>
    </div>
  );
}

const FooterNav = () => {
  const carNavRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const next = () => {
    currentIndex < 3 && setCurrentIndex(currentIndex + 1);
  };
  const prev = () => {
    currentIndex > 0 && setCurrentIndex(currentIndex - 1);
  };

  console.log(currentIndex);

  useEffect(() => {
    const carNav = carNavRef.current;
    const clean = carNav.children[1].offsetWidth;
    console.log(carNav.children[currentIndex + 1]);
    carNav.scrollTo({
      left: currentIndex > 0 ? clean * currentIndex + clean / 2.3 : clean / 4,
      behavior: "smooth",
    });
  }, [currentIndex]);
  return (
    <div className="gallery-footer-nav">
      <span class="material-symbols-rounded" onClick={prev}>
        chevron_left
      </span>
      <div className="car-nav" ref={carNavRef}>
        <div id="demo"></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div id="demo"></div>
      </div>
      <span class="material-symbols-rounded" onClick={next}>
        chevron_right
      </span>
    </div>
  );
};
