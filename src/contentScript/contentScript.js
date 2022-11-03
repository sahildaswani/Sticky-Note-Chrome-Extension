import React from "react";
import { createRoot } from "react-dom/client";
import { v4 as uuidv4 } from "uuid";
import Sticky from "../components/sticky/sticky";
import { EXTENSION_KEY, COLORS } from "../utilities/constants";

const renderSticky = (uuid = uuidv4(), color, top, left, width, height, text) => {
	const div = document.createElement("div");
	div.className = "sticky-container";
	div.style =
		"position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;";

	const root = createRoot(div);
	root.render(
		<Sticky
			top={top}
			left={left}
			width={width}
			height={height}
			text={text}
			uuid={uuid}
			color={color}
		/>
	);
	document.body.appendChild(div);
};

const renderAllStickies = (url) => {
	chrome.storage.local.get([EXTENSION_KEY], (result) => {
		const store = result[EXTENSION_KEY];
		console.log(store);
		const stickies = store.projects[store.currentProject].stickies;
		if (stickies.hasOwnProperty(url)) {
			stickies[url].forEach((sticky) => {
				renderSticky(
					sticky.uuid,
					sticky.color,
					sticky.top,
					sticky.left,
					sticky.width,
					sticky.height,
					sticky.text
				);
			});
		}
	});
};

const clearStickies = () => {
	const stickyContainers = document.querySelectorAll(".sticky-container");
	stickyContainers.forEach((stickyContainer) => stickyContainer.remove());
};

// TODO: content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	console.log("message", message);
	if (message.type === "ADD_STICKY") {
		renderSticky(uuidv4(), COLORS[message.color]);
	} else if (message.type === "PAGE_LOADED" || message.type === "UPDATE_PROJECT") {
		clearStickies();
		renderAllStickies(message.url);
	}
});
