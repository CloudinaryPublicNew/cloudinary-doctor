export const ADD_ACTIVE_TAB = 'ADD_ACTIVE_TAB';
export const ADD_REQUEST = 'ADD_REQUEST';
export const SET_REQUEST_COMPLETE = 'SET_REQUEST_COMPLETE';

const isCloudinaryByResponseHeader = (headers) => {
    let isCloudinary = false;
    
    headers.forEach((hd) => { 
        const headerName = hd.name.toLowerCase();
        const headerValue = hd.value.toLowerCase();
        
        if(headerName === "server" && headerValue === "cloudinary") {
            isCloudinary = true;
        }
    });

    return isCloudinary;
}

export const addTab = (tabId) => {
    return {
    type: ADD_ACTIVE_TAB,
    id: tabId || chrome.tabs.TAB_ID_NONE
    }
}

export const addRequest = (request) => {
    const { tabId = chrome.tabs.TAB_ID_NONE, requestId, url, timeStamp } = request;

    return {
        type: ADD_REQUEST,
        tabId: tabId,
        request: {
            requestId,
            url,
            startTime: timeStamp,
            status: 'pending'
        }
    }
}

export const setRequestComplete = (request) => {
    const { tabId = chrome.tabs.TAB_ID_NONE, timeStamp, requestId, responseHeaders } = request;
    
    return {
        type: SET_REQUEST_COMPLETE,
        tabId: tabId,
        requestId,
        timeStamp,
        isCloudinary: isCloudinaryByResponseHeader(responseHeaders)
    }
}