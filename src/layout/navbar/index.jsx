import React, { useState } from "react";

import "./navbar.scss";
import MenuItems from "../../components/menuItems";

export default function NavBar() {
  const [currentMenu, setCurrentMenu] = useState(0);
  const [menuArray, setMenuArray] = useState([
    { name: "Gallery", selected: true },
    { name: "About", selected: false },
    { name: "Contact", selected: false },
  ]);

  const handleClick = (index) => {
    setMenuArray((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, selected: true } : { ...item, selected: false }
      )
    );
    setCurrentMenu(index);
  };
  return (
    <div className="nav-bar">
      <div className="nav-title">
        <h1>3DStore</h1>
      </div>
      <div className="nav-menu">
        {menuArray.map((item, index) => (
          <MenuItems key={index} {...item} onclick={() => handleClick(index)} />
        ))}
      </div>
    </div>
  );
}
