import React from "react";
import { useState, useRef, useEffect } from "react";
import { Rnd } from "react-rnd";

import Header from "./header/header";
import { STICKY_WIDTH, STICKY_HEIGHT } from "../../utilities/constants";
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

  const onDelete = (e) => {
    e.target.parentNode.parentNode.parentNode.remove();
  };

  const handleUpdate = () => {
    // TODO - update sticky in storage
  };

  useEffect(() => {
    handleUpdate();
  }, [stickyTop, stickyLeft, stickyWidth, stickyHeight, stickyText]);

  return (
    <Rnd
      size={{ width: stickyWidth, height: stickyHeight }}
      position={{ x: stickyLeft, y: stickyTop }}
      minWidth="100px"
      minHeight="100px"
      cancel=".sticky-textarea .delete-icon"
      className="sticky"
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
    >
      <Header onDelete={onDelete} />
      <textarea
        className="sticky-textarea"
        ref={stickyRef}
        onChange={() => setStickyText(stickyRef.current.value)}
        value={text}
        placeholder="Add your note here..."
      />
    </Rnd>
  );
};

export default Sticky;
