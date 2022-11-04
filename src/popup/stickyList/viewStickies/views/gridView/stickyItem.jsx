import React from "react";
import Typography from "@mui/material/Typography";
import { IoCloseOutline } from "react-icons/io5";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import { useChromeStorageLocal } from "use-chrome-storage";
import { deleteSticky } from "../../../../../utilities/storage";
import { EXTENSION_KEY } from "../../../../../utilities/constants";
import { sendMessage } from "../../../../../utilities/chrome";

const StickyItem = ({ url, sticky }) => {
	const [storage, setStorage] = useChromeStorageLocal(EXTENSION_KEY);

	const handleDelete = () => {
		deleteSticky(url, sticky.uuid, storage, setStorage);
		sendMessage({ type: "DELETE_STICKY", uuid: sticky.uuid });
	};

	return (
		<Grid item xs={1}>
			<Paper
				sx={{
					height: "170px",
					backgroundColor: sticky.color.body,
					overflowWrap: "break-word",
					overflowY: "scroll",
				}}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						backgroundColor: sticky.color.header,
						position: "sticky",
						top: 0,
						zIndex: 1,
					}}
				>
					<IoCloseOutline
						size={18}
						style={{ color: "white", marginLeft: "5px", cursor: "pointer" }}
						onClick={handleDelete}
					/>
				</Box>
				<Typography
					variant="body2"
					sx={{
						color: "black",
						fontSize: "13px",
						lineHeight: "1.4",
						py: 1,
						px: 1.5,
					}}
				>
					{sticky.text}
				</Typography>
			</Paper>
		</Grid>
	);
};

export default StickyItem;
