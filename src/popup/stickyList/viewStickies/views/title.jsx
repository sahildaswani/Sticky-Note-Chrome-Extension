import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const Title = ({ url, title }) => {
	const getHostName = (url) => {
		const x = new URL(url);
		return x.hostname;
	};

	const openTab = (url) => {
		// check if tab is already open
		chrome.tabs.query({ url: url }, (tabs) => {
			if (tabs.length > 0) {
				chrome.tabs.update(tabs[0].id, { active: true });
			} else {
				chrome.tabs.create({ url: url });
			}
		});
	};

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				flexDirection: "row",
				my: 1,
				px: 2,
				cursor: "pointer",
			}}
			onClick={() => openTab(url)}
		>
			<Avatar
				src={`https://www.google.com/s2/favicons?domain=${url}&sz=64`}
				loading="lazy"
				variant="rounded"
				sx={{
					boxShadow: "0px 0px 1px 0px rgba(0,0,0,0.75)",
				}}
			/>
			<Box sx={{ display: "flex", flexDirection: "column", ml: 2, overflow: "hidden" }}>
				<Typography variant="body2">{getHostName(url)}</Typography>
				<Typography variant="caption" sx={{ color: "grey.500", whiteSpace: "nowrap" }}>
					{title}
				</Typography>
			</Box>
		</Box>
	);
};

export default Title;
