import React from "react";
import { useRef, useState } from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { MdDone } from "react-icons/md";

const AddProject = ({ addProject, setProjectState }) => {
	const inputRef = useRef(null);
	const [error, setError] = useState(false);

	const handleAddProject = () => {
		if (inputRef.current) {
			if (inputRef.current.value === "") {
				setError(true);
				return;
			}
			addProject(inputRef.current.value);
			setProjectState("view");
		}
	};

	return (
		<FormControl
			fullWidth
			size="small"
			sx={{ flexDirection: "row", alignItems: "center" }}
			component="form"
		>
			<TextField
				label="Project"
				variant="outlined"
				size="small"
				placeholder="Project name"
				inputRef={inputRef}
				sx={{ flex: 1, mr: 1 }}
				autoFocus
				error={error}
				onChange={() => {
					if (inputRef.current.value !== "") {
						setError(false);
					}
				}}
			/>
			<IconButton
				aria-label="done"
				size="medium"
				onClick={handleAddProject}
				type="submit"
				compontent="button"
			>
				<MdDone />
			</IconButton>
		</FormControl>
	);
};

export default AddProject;
