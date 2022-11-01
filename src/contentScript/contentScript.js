import React from "react";
import { createRoot } from "react-dom/client";
import { v4 as uuidv4 } from "uuid";
import Sticky from "../components/sticky/sticky";
import { EXTENSION_KEY } from "../utilities/constants";

const renderSticky = (uuid = uuidv4(), top, left, width, height, text, color) => {
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
						sticky.text,
						sticky.color
					);
				});
			}
		});
	}
});
