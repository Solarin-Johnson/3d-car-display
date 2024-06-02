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
      {/* <Image3d /> */}
    </>
  );
}
