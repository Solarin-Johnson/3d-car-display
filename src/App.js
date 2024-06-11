import React from "react";
import "./App.scss";
import NavBar from "./layout/navbar";
import Gallery from "./layout/gallery/gallery";
import Image3d from "./components/3d";

export default function App() {
  return (
    <>
      <NavBar />
      <Gallery />
      <ComingSoon />
      {/* <Image3d /> */}
    </>
  );
}

export const ComingSoon = () => {
  return (
    <div className="coming-soon">
      <h2>
        Almost there! This page will be available for this screen size shortly.
      </h2>
    </div>
  );
};
