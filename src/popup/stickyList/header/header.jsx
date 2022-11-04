import React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { COLORS } from "../../../utilities/constants";

const ScentenceCase = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 150,
		},
	},
};

const Header = ({ filteredColors, setFilteredColors, colorsArr, view, setView }) => {
	const handleChange = (e) => {
		setFilteredColors(e.target.value);
	};

	const handleViewChange = (e, newView) => {
		if (newView) {
			setView(newView);
		}
	};

	const renderValue = (selected) => {
		if (selected.length === 0) {
			return <Chip size="small" label="None" />;
		}

		if (selected.length === colorsArr.length) {
			return <Chip size="small" label="All" color="primary" />;
		}

		return (
			<Stack direction="row" spacing={0.5}>
				{colorsArr
					.filter((i) => selected.includes(i))
					.map((color) => (
						<Box
							key={color}
							sx={{
								height: "23px",
								width: "16px",
								borderRadius: "5px",
								backgroundColor: COLORS[color].body,
							}}
						></Box>
					))}
			</Stack>
		);
	};

	return (
		<Box sx={{ display: "flex", alignItems: "center", width: "100%", flexDirection: "row" }}>
			<FormControl sx={{ width: "134px" }} size="small">
				<InputLabel>Show</InputLabel>
				<Select
					multiple
					value={filteredColors}
					onChange={handleChange}
					input={<OutlinedInput label="Show" />}
					renderValue={(selected) => renderValue(selected)}
					MenuProps={MenuProps}
					displayEmpty={true}
				>
					{colorsArr.map((color) => (
						<MenuItem
							key={color}
							value={color}
							sx={{ height: "35px !important", paddingTop: "0px", paddingBottom: "0px" }}
						>
							<Checkbox checked={filteredColors.indexOf(color) > -1} />
							<ListItemText primary={ScentenceCase(color)} />
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<Box sx={{ flex: 1 }} />
			<ToggleButtonGroup value={view} exclusive onChange={handleViewChange} size="medium">
				<ToggleButton value="grid" aria-label="grid">
					<BsFillGridFill />
				</ToggleButton>
				<ToggleButton value="list" aria-label="list" disabled>
					<BsList />
				</ToggleButton>
			</ToggleButtonGroup>
		</Box>
	);
};

export default Header;
