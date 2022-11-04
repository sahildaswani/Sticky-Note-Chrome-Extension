import React from "react";
import { useMemo } from "react";
import { GridView, ListView } from "./views";

const ViewStickies = ({ view, storage, filteredColors }) => {
	// const stickies = storage?.projects[storage?.currentProject]?.stickies || {};
	const stickies = useMemo(
		() => storage?.projects[storage?.currentProject]?.stickies || {},
		[storage]
	);

	const webpageTitles = useMemo(
		() => storage?.projects[storage?.currentProject]?.webpageTitles || {},
		[storage]
	);

	// if sticky is not in filteredColors, then don't show it
	const filteredStickies = Object.entries(stickies).reduce((acc, [key, arr]) => {
		// sort stickies by top property ascending
		const x = arr
			.filter((sticky) => filteredColors.includes(sticky.color.name))
			.sort((a, b) => a.top - b.top);
		if (x.length > 0) {
			acc[key] = x;
		}
		return acc;
	}, {});

	if (view === "grid") {
		return <GridView stickies={filteredStickies} webpageTitles={webpageTitles} />;
	}
	return <ListView />;
};

export default ViewStickies;
