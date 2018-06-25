import reducers from './reducers.js';
import { 
  addTab, 
  addRequest, 
  setRequestComplete, 
  addRequestData
 } from './actions.js';

const store = window.Redux.createStore(reducers);

window._store = store;

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

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.type === "image-info") {
      chrome.tabs.query(
        {currentWindow: true, active : true}, function(tabArray){
          const tabId = tabArray[0]
          store.dispatch(addRequestData(request.data, tabId));

          const state = store.getState();
          const tab = state[tabId]
          const req = tab.find(i => i.url === request.url)
        }
      )
    }

    

    sendResponse({type: 'state': data: req});
  }
);

chrome.webRequest.onBeforeRequest.addListener(
  (request) => {
    store.dispatch(addRequest(request));    
},networkFilter);

chrome.webRequest.onCompleted.addListener(
  (request) => {
    store.dispatch(setRequestComplete(request));
}, networkFilter, ["responseHeaders"]);

chrome.webRequest.onErrorOccurred.addListener(
  (request) => {
    store.dispatch(addRequest(request, true));  
}, networkFilter);

chrome.tabs.onActivated.addListener((tab) => {
  const tabId = tab ? tab.tabId : chrome.tabs.TAB_ID_NONE;
  chrome.storage.local.set({ tabId: tabId });
  store.dispatch(addTab(tabId));
  
  registerToStoreChanges(store,() => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if(tabs.length) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
          // console.log(response.farewell);
        });
      }
      
    });
  })
});

