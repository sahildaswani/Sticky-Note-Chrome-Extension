import React from "react";
import { useState, useRef, useEffect } from "react";
import useToggle from "../../utilities/hooks/useToggle";
import { Rnd } from "react-rnd";
import Header from "./header/header";
import {
  STICKY_WIDTH,
  STICKY_HEIGHT,
  COLORS,
  EXTENSION_KEY,
} from "../../utilities/constants";
import { stickyTextarea, sticky } from "./sticky.styles";
import { useChromeStorageLocal } from "use-chrome-storage";
import { updateSticky } from "../../utilities/storage";

const Sticky = ({ top, left, width, height, text, uuid }) => {
  // sticky properties
  const id = uuid;
  const stickyRef = useRef(null);
  const [stickyTop, setStickyTop] = useState(
    top / 2 || window.scrollY / 2 + 25
  );
  const [stickyLeft, setStickyLeft] = useState(
    left / 2 || (window.innerWidth - STICKY_WIDTH) / 4
  );
  const [stickyWidth, setStickyWidth] = useState(width || STICKY_WIDTH);
  const [stickyHeight, setStickyHeight] = useState(height || STICKY_HEIGHT);
  const [stickyText, setStickyText] = useState(text || "");
  const [color, setColor] = useState(COLORS.BLUE);
  const [pinned, togglePinned] = useToggle(false);

  // store
  const [storage, setStorage] = useChromeStorageLocal(EXTENSION_KEY);

  const onDelete = (e) => {
    //find parent with sticky class
    const sticky = e.target.closest(".react-draggable");
    sticky.parentNode.remove();
  };

  useEffect(() => {
    if (storage) {
      updateSticky(storage, setStorage, {
        uuid: id,
        top: stickyTop,
        left: stickyLeft,
        width: stickyWidth,
        height: stickyHeight,
        text: stickyText,
        color,
        pinned,
      });
    }
  }, [
    stickyTop,
    stickyLeft,
    stickyWidth,
    stickyHeight,
    stickyText,
    color,
    pinned,
  ]);

  return (
    <Rnd
      default={{
        x: stickyLeft,
        y: stickyTop,
        width: stickyWidth,
        height: stickyHeight,
      }}
      size={{ width: stickyWidth, height: stickyHeight }}
      position={{ x: stickyLeft, y: stickyTop }}
      onDragStop={(e, d) => {
        console.log("drag stop", d);
        setStickyTop(d.y);
        setStickyLeft(d.x);
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        console.log(direction, ref, delta, position);
        setStickyWidth(ref.offsetWidth);
        setStickyHeight(ref.offsetHeight);
        setStickyTop(position.y);
        setStickyLeft(position.x);
      }}
      minWidth="100px"
      minHeight="100px"
      cancel=".sticky-textarea"
      style={{ ...sticky, backgroundColor: color.body }}
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
        style={stickyTextarea}
        ref={stickyRef}
        onChange={() => setStickyText(stickyRef.current.value)}
        defaultValue={text}
        placeholder="Add your note here..."
      />
    </Rnd>
  );
};

export default Sticky;
