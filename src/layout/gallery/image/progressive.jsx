// import { useEffect, useState } from "react";
// import thumb from "../../../assets/ferrarri.webp";

// const ProgressiveLoad = ({ ...props }) => {
//   const [src, setSrc] = useState(thumb);
//   const [isLoaded, setIsLoaded] = useState(false);
//   useEffect(() => {
//     const img = new Image();
//     img.src = data.high;
//     img.onload = () => {
//       setSrc(data.high);
//       setIsLoaded(true);
//     };
//   }, [data]);

//   return (
//     <>
//       <img
//         {...props}
//         src={src}
//         alt={"car thumb"}
//         className={`progressive-image ${isLoaded ? "loaded" : ""}`}
//         loading="lazy"
//       />
//     </>
//   );
// };
