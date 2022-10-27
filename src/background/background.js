import { EXTENSION_KEY } from "../utilities/constants.js";
import { v4 as uuidv4 } from "uuid";

chrome.runtime.onInstalled.addListener(() => {
  // Add storage for sticky notes
  const projectId = uuidv4();

  const store = {
    [EXTENSION_KEY]: {
      currentProject: projectId,
      projects: {
        [projectId]: {
          name: "Untitled Project",
          stickies: {},
        },
      },
    },
  };

  // Store the store in chrome local storage
  chrome.storage.local.set({ [EXTENSION_KEY]: store }, () => {
    if (chrome.runtime.lastError) {
      /* error */
      console.log(chrome.runtime.lastError.message);
      return;
    }
    console.log("Store initialized");
  });
});
