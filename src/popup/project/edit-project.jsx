import React from "react";
import { useRef, useState } from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { MdDone } from "react-icons/md";

const EditProject = ({ storage, selectedProject, editProjectName, setProjectState }) => {
	const inputRef = useRef(null);
	const [error, setError] = useState(false);

	const handleEditProjectName = () => {
		if (inputRef.current && !error) {
			editProjectName(selectedProject, inputRef.current.value);
			setProjectState("view");
		}
	};

	return (
		<FormControl fullWidth size="small" sx={{ flexDirection: "row", alignItems: "center" }}>
			<TextField
				label="Project"
				variant="outlined"
				size="small"
				defaultValue={storage?.projects[selectedProject]?.name}
				inputRef={inputRef}
				sx={{ flex: 1, mr: 1 }}
				autoFocus
				error={error}
				onChange={() => {
					if (inputRef.current.value === "") {
						setError(true);
					} else {
						setError(false);
					}
				}}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						handleEditProjectName();
					}
				}}
			/>
			<IconButton size="medium" onClick={handleEditProjectName}>
				<MdDone />
			</IconButton>
		</FormControl>
	);
};

export default EditProject;
