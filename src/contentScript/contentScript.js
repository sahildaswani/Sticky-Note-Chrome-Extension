import Sticky from "../components/sticky/sticky";
import ReactDOM from "react-dom";
import React from "react";

const renderSticky = (top, left, width, height, text) => {
  const div = document.createElement("div");
  div.style = "position: absolute; top: 0; left: 0; width: 100%; height: 100%;";
  ReactDOM.render(
    <Sticky top={top} left={left} width={width} height={height} text={text} />,
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
  }
});
