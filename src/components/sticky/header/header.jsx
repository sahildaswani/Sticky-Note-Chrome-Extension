import React from "react";
import useToggle from "../../../utilities/hooks/useToggle";
import { IoCloseOutline } from "react-icons/io5";
import { SlOptions } from "react-icons/sl";

import Dropdown from "./dropdown/dropdown";
import "./header.css";

const Header = ({ onDelete, color, setColor, togglePinned, pinned }) => {
  const [showMenu, toggleShowMenu] = useToggle();

  return (
    <>
      <div
        className="header"
        style={{
          backgroundColor: color.header,
          cursor: pinned ? "default" : "move",
        }}
      >
        <IoCloseOutline
          size="1.4em"
          onClick={(e) => onDelete(e)}
          className="sticky-icon"
        />
        <SlOptions className="sticky-icon" onClick={() => toggleShowMenu()} />
      </div>
      {showMenu && (
        <Dropdown
          toggleShowMenu={toggleShowMenu}
          color={color}
          setColor={setColor}
          onDelete={onDelete}
          pinned={pinned}
          togglePinned={togglePinned}
        />
      )}
    </>
  );
};

export default Header;
