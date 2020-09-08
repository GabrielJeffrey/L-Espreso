import React, { useState } from "react";

export const Feature = ({ initialIcon, header, children }) => {
  const [icon, setIcon] = useState(initialIcon);

  const handleMouseEnter = (e) => {
    let iconName = icon;
    const newIcon = iconName.replace("-outline", "");
    setIcon(newIcon);
  };

  const handleMouseLeave = (e) => {
    setIcon(initialIcon);
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="feature">
      <figure className="feature__icon">
        <ion-icon name={icon}></ion-icon>
      </figure>
      <h4 className="feature__header">{header}</h4>
      <p className="feature__text">{children}</p>
    </div>
  );
};
