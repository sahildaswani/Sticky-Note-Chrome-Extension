import React from "react";
import { createRoot } from "react-dom/client";
import { EXTENSION_KEY } from "../utilities/constants";
import { useChromeStorageLocal } from "use-chrome-storage";
import { v4 as uuidv4 } from "uuid";
import { sendMessage } from "../utilities/chrome";
import Project from "./project/project";
import AddStickyActions from "./stickyActions/addStickyActions";
import StickyList from "./stickyList/stickyList";
import NoStickies from "./noStickies";
import "./popup.css";

const Popup = () => {
	const [storage, setStorage] = useChromeStorageLocal(EXTENSION_KEY);

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

			// if projects is empty, add a new project
			if (Object.keys(newStorage.projects).length === 0) {
				newStorage.projects = {
					[uuidv4()]: {
						name: "Untitled Project",
						stickies: {},
					},
				};
			}

			const projectsAsc = Object.entries(newStorage.projects).sort((a, b) =>
				a[1].name.localeCompare(b[1].name)
			);
			newStorage.currentProject = projectsAsc[0][0];

			setStorage(newStorage);
		}
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
			<AddStickyActions />

			{Object.keys(storage?.projects[storage?.currentProject]?.stickies || {}).length <= 0 ? (
				<NoStickies />
			) : (
				<StickyList storage={storage} setStorage={setStorage} />
			)}
		</div>
	);
};

const root = createRoot(document.getElementById("react-root"));
root.render(<Popup />);
