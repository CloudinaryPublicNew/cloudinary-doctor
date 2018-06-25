import reducers from './reducers.js';
import {
	addTab,
	addRequest,
	setRequestComplete,
	addScrapedData,
	resetTab,
} from './actions.js';

const store = window.Redux.createStore(reducers);

window._store = store;

let _storeUnsubscribe = null;

const registerToStoreChanges = (store, onChange) => {
	let currentState = store.getState();

	return store.subscribe(() => {
		const newState = store.getState();

		if (newState !== currentState) {
			const prevState = currentState;
			currentState = newState;
			onChange(newState, prevState);
		}
	});
};

const networkFilter = {
	urls: ["<all_urls>"],
	types: ["image"]
};

const onImageInfo = (request, sender, sendResponse) =>{
	const tabId = sender.tab.id
	if (store.getState() === {}) {
		addTab(tabId)
	}
	store.dispatch(addScrapedData(request.data, tabId));
	const state = store.getState();
	const tab = state[tabId]
	const req = tab.find(i => i.url === request.data.src)

	sendResponse({type: 'image-data', data: req});
};

const onGetState = (request, sender, sendResponse) => {
	const tabId = sender.tab.id,
		state = store.getState();

	sendResponse({type: "state", data: state[tabId]});
};

const messageListeners = {
	"image-info": onImageInfo,
	"get-state": onGetState,
};

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.type && messageListeners[request.type]){
			messageListeners[request.type](request, sender, sendResponse);
		}
	}
);

chrome.webRequest.onBeforeRequest.addListener(
	(request) => {
		store.dispatch(addRequest(request));
	}, networkFilter);

chrome.webRequest.onCompleted.addListener(
	(request) => {
		store.dispatch(setRequestComplete(request));
	}, networkFilter, ["responseHeaders"]);

chrome.webRequest.onErrorOccurred.addListener(
	(request) => {
		store.dispatch(addRequest(request, true));
	}, networkFilter);

// chrome.tabs.onActivated.addListener((tab) => {
// 	const tabId = tab ? tab.tabId : chrome.tabs.TAB_ID_NONE;
// 	chrome.storage.local.set({tabId: tabId});
// 	store.dispatch(addTab(tabId));
//
//
// });

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
	if (changeInfo.status === "loading"){
		// store.dispatch(addTab(tabId));
		store.dispatch(resetTab(tabId));
	}

	if (_storeUnsubscribe ){
		_storeUnsubscribe();
	}

	_storeUnsubscribe = registerToStoreChanges(store, (next,prev) => {

		if (tabId !== chrome.tabs.TAB_ID_NONE){
			if (next[tabId].length) {
				const newData = next[tabId].filter((imgData, i) =>
					(!prev[tabId][i] || imgData !== prev[tabId][i]));

				if (newData.length) {
					chrome.tabs.sendMessage(tabId, {
						type: "updated-images",
						data: newData
					});
				}
			}
		}

		// chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
		// 	if (tabs.length){
		//
		// 	}
		// 	const tabId = tabs[0].id;
		// const state = store.getState();
		// const tab = state[tabId]
		// const req = tab.find(i => i.url ===)
		//
		// if (tab) {
		// 	chrome.tabs.sendMessage(tabId, {
		// 		type: 'requestUpdated',
		// 		data: req
		// 	}, function (response) {
		// 		// console.log(response.farewell);
		// 	});
		// }
		// });
	});

	// if (changeInfo.status === 'complete') {
	// 	store.dispatch(resetTab(tabId));
	// }
});

