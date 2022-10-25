import React from "react";
import { useState } from "react";

const DropdownItem = ({ children, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);

  const style = {
    backgroundColor: isHovered ? props.color.body : props.color.header,
  };

  return (
    <div
      {...props}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {props?.icon}
      {children}
    </div>
  );
};

export default DropdownItem;
