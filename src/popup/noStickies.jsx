import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const NoStickies = () => {
	return (
		<Paper sx={{ p: 2, my: 2 }} elevation={1}>
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<Typography variant="h6">No stickies in this project</Typography>
			</Box>
		</Paper>
	);
};

export default NoStickies;
