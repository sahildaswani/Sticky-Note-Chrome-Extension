import React from "react";
import { useState, useRef, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { SlOptions } from "react-icons/sl";

import Dropdown from "./dropdown/dropdown";
import "./header.css";

const Header = ({ onDelete, color, setColor }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="header" style={{ backgroundColor: color.header }}>
        <IoCloseOutline
          size="1.4em"
          onClick={(e) => onDelete(e)}
          className="sticky-icon"
        />
        <SlOptions
          className="sticky-icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </div>
      {isMenuOpen && (
        <Dropdown
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          color={color}
          setColor={setColor}
        />
      )}
    </>
  );
};

export default Header;
