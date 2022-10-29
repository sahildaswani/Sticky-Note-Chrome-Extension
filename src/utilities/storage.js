const updateSticky = (storage, setStorage, newStickyData) => {
  const url = window.location.href;
  const newStorage = storage;

  // check if url exists in storage
  const urlExists =
    newStorage.projects[newStorage.currentProject].stickies.hasOwnProperty(url);

  if (!urlExists) {
    newStorage.projects[newStorage.currentProject].stickies[url] = [];
  }

  // check if sticky exists in storage
  const stickyIndex = newStorage.projects[newStorage.currentProject].stickies[
    url
  ].findIndex((sticky) => sticky.uuid === newStickyData.uuid);

  if (stickyIndex === -1) {
    newStorage.projects[newStorage.currentProject].stickies[url].push(
      newStickyData
    );
  } else {
    newStorage.projects[newStorage.currentProject].stickies[url][stickyIndex] =
      newStickyData;
  }

  console.log(newStorage);

  setStorage(newStorage);
};

const deleteSticky = (storage, setStorage, uuid) => {
  //TODO: delete sticky
};

export { updateSticky };
