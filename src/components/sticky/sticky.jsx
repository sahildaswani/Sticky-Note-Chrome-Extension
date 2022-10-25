import React from "react";
import { useState, useRef, useEffect } from "react";
import useToggle from "../../utilities/hooks/useToggle";
import { Rnd } from "react-rnd";

import Header from "./header/header";
import { STICKY_WIDTH, STICKY_HEIGHT, COLORS } from "../../utilities/constants";
import "./sticky.css";

const Sticky = ({ top, left, width, height, text }) => {
  const stickyRef = useRef(null);
  const [stickyTop, setStickyTop] = useState(top || window.scrollY / 2 + 25);
  const [stickyLeft, setStickyLeft] = useState(
    left || (window.innerWidth - STICKY_WIDTH) / 4
  );
  const [stickyWidth, setStickyWidth] = useState(width || STICKY_WIDTH);
  const [stickyHeight, setStickyHeight] = useState(height || STICKY_HEIGHT);
  const [stickyText, setStickyText] = useState(text || "");
  const [color, setColor] = useState(COLORS.BLUE);
  const [pinned, togglePinned] = useToggle(false);

  const onDelete = (e) => {
    //find parent with sticky class
    const sticky = e.target.closest(".sticky");
    sticky.parentNode.remove();
  };

  const handleUpdate = () => {
    // TODO - update sticky in storage
  };

  useEffect(() => {
    handleUpdate();
  }, [stickyTop, stickyLeft, stickyWidth, stickyHeight, stickyText, color]);

  return (
    <Rnd
      size={{ width: stickyWidth, height: stickyHeight }}
      position={{ x: stickyLeft, y: stickyTop }}
      minWidth="100px"
      minHeight="100px"
      cancel=".sticky-textarea .delete-icon"
      className="sticky"
      style={{ backgroundColor: color.body }}
      onDragStop={(e, d) => {
        setStickyTop(d.y);
        setStickyLeft(d.x);
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        setStickyWidth(ref.offsetWidth);
        setStickyHeight(ref.offsetHeight);
        setStickyTop(position.y);
        setStickyLeft(position.x);
      }}
      bounds="body"
      dragHandleClassName="header"
      disableDragging={pinned}
      enableResizing={!pinned}
    >
      <Header
        onDelete={onDelete}
        setColor={setColor}
        color={color}
        togglePinned={togglePinned}
        pinned={pinned}
      />
      <textarea
        className="sticky-textarea"
        ref={stickyRef}
        onChange={() => setStickyText(stickyRef.current.value)}
        defaultValue={text}
        placeholder="Add your note here..."
      />
    </Rnd>
  );
};

export default Sticky;
