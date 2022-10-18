import React from "react";
import { createRoot } from "react-dom/client";

const Popup = () => {
  return (
    <div style={{ width: "300px", height: "400px" }}>
      <button
        onClick={() =>
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { type: "ADD_STICKY" }, () => {
              console.log("sent message");
            });
          })
        }
      >
        Add Sticky
      </button>
    </div>
  );
};

const root = createRoot(document.getElementById("react-root"));
root.render(<Popup />);
