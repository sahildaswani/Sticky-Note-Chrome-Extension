import React from "react";
import { useMemo } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { IoAdd } from "react-icons/io5";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import Tooltip from "@mui/material/Tooltip";

const SelectProject = ({
	storage,
	selectedProject,
	handleProjectChange,
	deleteProject,
	setProjectState,
}) => {
	const projects = useMemo(() => {
		const sortedProjects = Object.entries(storage?.projects || {}).sort((a, b) =>
			a[1].name.localeCompare(b[1].name)
		);
		return sortedProjects.map((p) => p[0]);
	}, [storage]);

	return (
		<FormControl fullWidth size="small" sx={{ flexDirection: "row", alignItems: "center" }}>
			<InputLabel>Project</InputLabel>
			<Select
				label="Project"
				value={selectedProject}
				renderValue={(value) => (
					<Box sx={{ display: "flex", alignItems: "center" }}>
						{storage?.projects[value]?.name}
						<IconButton
							size="small"
							sx={{ right: "30px", position: "absolute", zIndex: 10000000 }}
							onClick={() => {
								setProjectState("edit");
							}}
						>
							<AiOutlineEdit />
						</IconButton>
					</Box>
				)}
				onChange={handleProjectChange}
				variant="outlined"
				sx={{ flex: 1, mr: 1 }}
			>
				{projects.map((project) => (
					<MenuItem key={project} value={project}>
						{storage.projects[project].name}
						{project === selectedProject && (
							<IconButton
								size="small"
								sx={{ right: "10px", position: "absolute", zIndex: 10000000 }}
								onClick={() => deleteProject(project)}
							>
								<AiOutlineDelete />
							</IconButton>
						)}
					</MenuItem>
				))}
			</Select>
			<Tooltip title="Add Project">
				<IconButton aria-label="add" size="medium" onClick={() => setProjectState("add")}>
					<IoAdd />
				</IconButton>
			</Tooltip>
		</FormControl>
	);
};

export default SelectProject;
