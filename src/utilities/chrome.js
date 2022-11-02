const sendMessage = (object, callback) => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.tabs.sendMessage(tabs[0].id, { ...object, url: tabs[0].url }, callback);
	});
};

export { sendMessage };
