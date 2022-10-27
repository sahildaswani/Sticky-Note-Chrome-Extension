import React from "react";
import { useMemo } from "react";
import { createRoot } from "react-dom/client";
import { EXTENSION_KEY } from "../utilities/constants";
import { useChromeStorageLocal } from "use-chrome-storage";

const Popup = () => {
  const [storage, setStorage] = useChromeStorageLocal(EXTENSION_KEY);
  const project = useMemo(() => {
    if (storage) {
      const store = storage[EXTENSION_KEY];
      return store.projects[store.currentProject];
    }
    return "";
  }, [storage]);

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
      <button
        onClick={() => {
          console.log(store[EXTENSION_KEY]);
        }}
      >
        Get Storage
      </button>
      <p>{project.name}</p>
    </div>
  );
};

const root = createRoot(document.getElementById("react-root"));
root.render(<Popup />);
