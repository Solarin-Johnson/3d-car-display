import React from "react";

export default function MenuItems({ name, selected, onclick, ...props }) {
  return (
    <div
      className="nav-menu-items"
      state={selected}
      onClick={onclick}
      {...props}
    >
      {name}
    </div>
  );
}
