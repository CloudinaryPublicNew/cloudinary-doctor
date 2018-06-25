import reducers from './reducers.js';
import { 
  addTab, 
  addRequest, 
  setRequestComplete } from './actions.js';

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


// const unsubscribe = store.subscribe(() => {
  
//   chrome.storage.local.set({
//     state: store.getState()
//   });
  
//   chrome.storage.local.get(["tabId"], (result) => {
//     chrome.tabs.sendRequest(result.tabId, {
//       storeUpdated: true
//     });
//   });

// });

const networkFilter = {
  urls: ["<all_urls>"],
  types: ["image"]
};

chrome.webRequest.onBeforeRequest.addListener(
  (request) => {
    store.dispatch(addRequest(request));    
},networkFilter);

chrome.webRequest.onCompleted.addListener(
  (request) => {
    store.dispatch(setRequestComplete(request));
}, networkFilter, ["responseHeaders"]);

chrome.tabs.onActivated.addListener((tab) => {
  const tabId = tab ? tab.tabId : chrome.tabs.TAB_ID_NONE;
  chrome.storage.local.set({ tabId: tabId });
  store.dispatch(addTab(tabId));
  
  //const port = chrome.  runtime.connect({name: "cloudinary"});

  registerToStoreChanges(store,() => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if(tabs.length) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
          // console.log(response.farewell);
        });
      }
      
    });

    // port.postMessage({
    //   type: "state-change", 
    //   data: store.getState()}
    // );
  })
});




//   chrome.webRequest.onBeforeRequest.addListener((details) => {
//       const { tabId, requestId } = details;
//       if (!store.hasOwnProperty(tabId)) {
//         alert("sdsdsd");
//           return;
//       }

//       store[tabId].requests[requestId] = {
//           requestId: requestId,
//           url: details.url,
//           startTime: details.timeStamp,
//           status: 'pending'
//       };
//       console.log(store[tabId].requests[requestId]);
//   }, networkFilters);

//   chrome.webRequest.onCompleted.addListener((details) => {
//       const { tabId, requestId } = details;
//       if (!store.hasOwnProperty(tabId) || !store[tabId].requests.hasOwnProperty(requestId)) {
//           return;
//       }

//       const request = store[tabId].requests[requestId];

//       Object.assign(request, {
//           endTime: details.timeStamp,
//           requestDuration: details.timeStamp - request.startTime,
//           status: 'complete'
//       });
//       console.log(store[tabId].requests[details.requestId]);
//   }, networkFilters);

//   chrome.webRequest.onErrorOccurred.addListener((details)=> {
//       const { tabId, requestId } = details;
//       if (!store.hasOwnProperty(tabId) || !store[tabId].requests.hasOwnProperty(requestId)) {
//           return;
//       }

//       const request = store[tabId].requests[requestId];
//       Object.assign(request, {
//           endTime: details.timeStamp,           
//           status: 'error',
//       });
//       console.log(store[tabId].requests[requestId]);
//   }, networkFilters);

//   chrome.tabs.onActivated.addListener((tab) => {
//       const tabId = tab ? tab.tabId : chrome.tabs.TAB_ID_NONE;
//       if (!store.hasOwnProperty(tabId)) {
//           store[tabId] = {
//               id: tabId,
//               requests: {},
//               registerTime: new Date().getTime()
//           };
//       }
//   });
//   chrome.tabs.onRemoved.addListener((tab) => {
//       const tabId = tab.tabId;
//       if (!store.hasOwnProperty(tabId)) {
//           return;
//       }
//       store[tabId] = null;
//   });
// }());




// // chrome.runtime.onInstalled.addListener(() => {
  

// //   chrome.storage.sync.set({color: '#3aa757'}, () => {
// //     console.log('The color is green.');
// //   });
  
  
// //   chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    
// //     // make extension available if find <img> in markup
// //     const visibilityCondition = new chrome.declarativeContent.PageStateMatcher({
// //       css: ["ssd"]
// //     });

// //     chrome.declarativeContent.onPageChanged.addRules([{
// //       conditions: [visibilityCondition],
// //       actions: [new chrome.declarativeContent.ShowPageAction()]
// //     }]);
// //   });

// //   var rule2 = {
// //     conditions: [
// //       new chrome.declarativeWebRequest.RequestMatcher({
// //         url: { hostSuffix: '*.*.com' } }),
// //     ],
// //     actions: [
// //       () => {
// //         alert("sdsdsdsds");
// //       }
// //     ]
// //   };

// //   // only supported on beta channel
// //   // chrome.declarativeWebRequest.onRequest.addRules([
// //   //   new chrome.declarativeWebRequest.RequestMatcher({

// //   // ]);

 
// // });
