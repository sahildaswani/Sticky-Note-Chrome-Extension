const updateSticky = (storage, setStorage, newStickyData) => {
	const url = window.location.href;
	const newStorage = storage;

	// check if url exists in storage
	const urlExists = newStorage.projects[newStorage.currentProject].stickies.hasOwnProperty(url);

	if (!urlExists) {
		newStorage.projects[newStorage.currentProject].stickies[url] = [];
		newStorage.projects[newStorage.currentProject].webpageTitles[url] = document.title;
	}

	// check if sticky exists in storage
	const stickyIndex = newStorage.projects[newStorage.currentProject].stickies[url].findIndex(
		(sticky) => sticky.uuid === newStickyData.uuid
	);

	if (stickyIndex === -1) {
		newStorage.projects[newStorage.currentProject].stickies[url].push(newStickyData);
	} else {
		newStorage.projects[newStorage.currentProject].stickies[url][stickyIndex] = newStickyData;
	}

	console.log(newStorage);

	setStorage(newStorage);
};

const deleteSticky = (e, uuid, storage, setStorage) => {
	//TODO: delete sticky
	const url = window.location.href;
	const newStorage = storage;

	// check if url exists in storage
	const urlExists = newStorage.projects[newStorage.currentProject].stickies.hasOwnProperty(url);

	if (!urlExists) {
		return;
	}

	// check if sticky exists in storage
	const stickyIndex = newStorage.projects[newStorage.currentProject].stickies[url].findIndex(
		(sticky) => sticky.uuid === uuid
	);

	if (stickyIndex === -1) {
		return;
	}

	// delete sticky from storage
	newStorage.projects[newStorage.currentProject].stickies[url].splice(stickyIndex, 1);

	// delete url from storage if no stickies left
	if (newStorage.projects[newStorage.currentProject].stickies[url].length === 0) {
		delete newStorage.projects[newStorage.currentProject].stickies[url];
		delete newStorage.projects[newStorage.currentProject].webpageTitles[url];
	}

	setStorage(newStorage);

	// remove sticky from dom
	e.target.closest(".sticky-container").remove();
};

export { updateSticky, deleteSticky };
