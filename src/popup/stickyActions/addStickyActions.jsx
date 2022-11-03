import React from "react";
import { useState } from "react";
import { COLORS } from "../../utilities/constants";
import { sendMessage } from "../../utilities/chrome";
import ToggleButton from "@mui/material/ToggleButton";
import MuiToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { SlNote } from "react-icons/sl";
import { styled } from "@mui/material/styles";

const ToggleButtonGroup = styled(MuiToggleButtonGroup)(({ theme }) => ({
	"& .MuiToggleButtonGroup-grouped": {
		margin: theme.spacing(0.5),
		border: 0,
		"&.Mui-disabled": {
			border: 0,
		},
		"&:not(:first-of-type)": {
			borderRadius: theme.shape.borderRadius,
		},
		"&:first-of-type": {
			borderRadius: theme.shape.borderRadius,
		},
	},
}));

const AddStickyActions = () => {
	const [color, setColor] = useState("PINK");
	const colorArray = Object.keys(COLORS);

	const addSticky = () => {
		sendMessage({ type: "ADD_STICKY", color: color }, () => {
			console.log("sent message");
		});
	};

	const handleChange = (event, newColor) => {
		if (newColor !== null) {
			setColor(newColor);
		}
	};

	return (
		<>
			<Paper elevation={3} sx={{ my: 2 }}>
				<Button
					fullWidth
					onClick={addSticky}
					sx={{
						backgroundColor: COLORS[color].body,
						color: "black",
						borderRadius: "5px 5px 0px 0px",
						// on hover
						"&:hover": {
							backgroundColor: COLORS[color].header,
						},
					}}
					startIcon={<SlNote />}
				>
					Add Sticky
				</Button>
				<ToggleButtonGroup
					value={color}
					exclusive
					onChange={handleChange}
					aria-label="text alignment"
				>
					{colorArray.map((color) => (
						<ToggleButton key={color} value={color} aria-label={color} sx={{ padding: "8px" }}>
							<Box sx={{ width: "29px", height: "30px", backgroundColor: COLORS[color].body }} />
						</ToggleButton>
					))}
				</ToggleButtonGroup>
			</Paper>
			<Divider />
		</>
	);
};

export default AddStickyActions;
