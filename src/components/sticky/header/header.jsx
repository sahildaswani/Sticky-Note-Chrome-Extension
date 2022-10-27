import React from "react";
import useToggle from "../../../utilities/hooks/useToggle";
import { IoCloseOutline } from "react-icons/io5";
import { SlOptions } from "react-icons/sl";

import Dropdown from "./dropdown/dropdown";
import { header, stickyIcon } from "./header.styles";

const Header = ({ onDelete, color, setColor, togglePinned, pinned }) => {
  const [showMenu, toggleShowMenu] = useToggle();

  return (
    <>
      <div
        className="header"
        style={{
          ...header,
          backgroundColor: color.header,
          cursor: pinned ? "default" : "move",
        }}
      >
        <IoCloseOutline
          size={22}
          onClick={(e) => onDelete(e)}
          style={stickyIcon}
        />
        <SlOptions
          size={16}
          style={stickyIcon}
          onClick={() => toggleShowMenu()}
        />
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
