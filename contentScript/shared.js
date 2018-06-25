const requestState = (cb) => {

	chrome.runtime.sendMessage(chrome.runtime.id, {
		type: "get-state",
	}, null, (response) => {

		if (response && response.type === "state"){
			cb(response.data);
		}
	});

};
