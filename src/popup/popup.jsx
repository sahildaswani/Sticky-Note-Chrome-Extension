import React from "react";
import { createRoot } from "react-dom/client";
import { EXTENSION_KEY } from "../utilities/constants";
import { useChromeStorageLocal } from "use-chrome-storage";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import { sendMessage } from "../utilities/chrome";
import Project from "./project/project";
import "./popup.css";

const Popup = () => {
	const [storage, setStorage] = useChromeStorageLocal(EXTENSION_KEY);

	console.log(storage);

	const handleProjectChange = (e) => {
		if (storage) {
			setStorage({
				...storage,
				currentProject: e.target.value,
			});
			sendMessage({ type: "UPDATE_PROJECT" });
		}
	};

	const editProjectName = (uuid, value) => {
		if (storage) {
			// edit project name
			setStorage({
				...storage,
				projects: {
					...storage.projects,
					[uuid]: {
						...storage.projects[uuid],
						name: value,
					},
				},
			});
		}
	};

	const addProject = (value) => {
		if (storage) {
			// create new project
			const uuid = uuidv4();
			setStorage({
				...storage,
				projects: {
					...storage.projects,
					[uuid]: {
						name: value,
						stickies: {},
					},
				},
				currentProject: uuid,
			});
			sendMessage({ type: "UPDATE_PROJECT" });
		}
	};

	const deleteProject = (uuid) => {
		if (storage) {
			// delete project
			const newStorage = storage;
			delete newStorage.projects[uuid];
			setStorage(newStorage);
		}
	};

	const addSticky = () => {
		sendMessage({ type: "ADD_STICKY" }, () => {
			console.log("sent message");
		});
	};

	return (
		<div className="popup">
			<Project
				storage={storage}
				handleProjectChange={handleProjectChange}
				addProject={addProject}
				editProjectName={editProjectName}
				deleteProject={deleteProject}
			/>

			<Button onClick={addSticky}>Add Sticky</Button>
			<Button
				variant="contained"
				color="primary"
				onClick={() => {
					console.log(storage);
				}}
			>
				Get Storage
			</Button>
		</div>
	);
};

const root = createRoot(document.getElementById("react-root"));
root.render(<Popup />);
