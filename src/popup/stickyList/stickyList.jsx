import React from "react";
import { useState } from "react";
import { COLORS } from "../../utilities/constants";
import Header from "./header/header";
import Box from "@mui/material/Box";
import ViewStickies from "./viewStickies/viewStickies";

const colorsArr = Object.keys(COLORS);

const StickyList = ({ storage, setStorage }) => {
	const [filteredColors, setFilteredColors] = useState(colorsArr);
	const [view, setView] = useState("grid");

	return (
		<Box sx={{ my: 2 }}>
			<Header
				filteredColors={filteredColors}
				setFilteredColors={setFilteredColors}
				colorsArr={colorsArr}
				view={view}
				setView={setView}
			/>
			<ViewStickies view={view} storage={storage} filteredColors={filteredColors} />
		</Box>
	);
};

export default StickyList;
