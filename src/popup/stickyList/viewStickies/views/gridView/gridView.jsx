import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import Title from "../title";
import StickyItem from "./stickyItem";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const GridView = ({ stickies, webpageTitles }) => {
	const [animateSticky] = useAutoAnimate({ duration: 250 });

	return (
		<Box sx={{ my: 2 }}>
			{Object.keys(stickies).map((url) => (
				<>
					<Title key={url} url={url} title={webpageTitles[url]} />
					<Grid container spacing={1} columns={2} sx={{ my: 1 }} ref={animateSticky}>
						{stickies[url].map((sticky) => (
							<StickyItem key={sticky.id} url={url} sticky={sticky} />
						))}
					</Grid>
					<Divider sx={{ mb: 2 }} />
				</>
			))}
		</Box>
	);
};

export default GridView;
