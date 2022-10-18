import React from "react";
// import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import "./header.css";

const Header = ({ onDelete }) => {
  return (
    <div className="header">
      <IoCloseOutline
        size="1.4em"
        style={{
          color: "white",
          cursor: "pointer",
        }}
        onClick={(e) => onDelete(e)}
        className="delete-icon"
      />
    </div>
  );
};

export default Header;
