import React from "react";
import { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import SelectProject from "./select-project";
import AddProject from "./add-project";
import EditProject from "./edit-project";

const ProjectForm = ({
	storage,
	handleProjectChange,
	addProject,
	editProjectName,
	deleteProject,
}) => {
	const [projectState, setProjectState] = useState("view");
	const selectedProject = useMemo(() => storage?.currentProject || "", [storage]);

	switch (projectState) {
		case "view":
			return (
				<SelectProject
					storage={storage}
					selectedProject={selectedProject}
					handleProjectChange={handleProjectChange}
					setProjectState={setProjectState}
					deleteProject={deleteProject}
				/>
			);
		case "add":
			return <AddProject addProject={addProject} setProjectState={setProjectState} />;
		case "edit":
			return (
				<EditProject
					storage={storage}
					selectedProject={selectedProject}
					editProjectName={editProjectName}
					setProjectState={setProjectState}
				/>
			);
		default:
			return undefined;
	}
};

const Project = ({ storage, handleProjectChange, addProject, editProjectName, deleteProject }) => {
	return (
		<>
			<Box sx={{ mb: 2 }}>
				<ProjectForm
					storage={storage}
					handleProjectChange={handleProjectChange}
					addProject={addProject}
					editProjectName={editProjectName}
					deleteProject={deleteProject}
				/>
			</Box>
			<Divider />
		</>
	);
};

export default Project;
