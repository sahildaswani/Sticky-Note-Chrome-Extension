import Sticky from "../components/sticky/sticky";
import ReactDOM from "react-dom";
import React from "react";
import { EXTENSION_KEY } from "../utilities/constants";
import { v4 as uuidv4 } from "uuid";
// import StickyContainer from "../components/container/sticky-container";

const renderSticky = (uuid = uuidv4(), top, left, width, height, text) => {
  const div = document.createElement("div");
  div.style =
    "position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;";
  ReactDOM.render(
    <Sticky
      top={top}
      left={left}
      width={width}
      height={height}
      text={text}
      uuid={uuid}
    />,
    div
  );
  console.log(div);
  document.body.appendChild(div);
};

// TODO: content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("message", message);
  if (message.type === "ADD_STICKY") {
    renderSticky();
  } else if (message.type === "PAGE_LOADED") {
    chrome.storage.local.get([EXTENSION_KEY], (result) => {
      const store = result[EXTENSION_KEY];
      console.log(store);
      const stickies = store.projects[store.currentProject].stickies;
      if (stickies.hasOwnProperty(message.url)) {
        stickies[message.url].forEach((sticky) => {
          renderSticky(
            sticky.uuid,
            sticky.top,
            sticky.left,
            sticky.width,
            sticky.height,
            sticky.text
          );
        });
      }
    });
  }
});
