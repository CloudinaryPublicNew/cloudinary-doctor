
import { 
    ADD_ACTIVE_TAB, 
    ADD_REQUEST, 
    SET_REQUEST_COMPLETE,
     ADD_REQUEST_DATA 
} from './actions.js';

export default (state = {}, action) => {
    switch (action.type) {
        case ADD_ACTIVE_TAB:
            return Object.assign({}, state, {
                [action.id]: []
            });
        case ADD_REQUEST:
            return Object.assign({}, state, {
                [action.tabId]: [...state[action.tabId], action.request]
            });
        case ADD_REQUEST_DATA:
            if (state[action.tabId]) {
                const idx = state[action.tabId].findIndex(i => i.url === action.data.url)
                clone = [...state[action.tabId]]
                clone[idx] = [...clone[idx], data]
    
                return Object.assign({}, state, {
                    [action.tabId]: [...state[action.tabId], clone]
                });

            } else {
                return state;
            }
        case SET_REQUEST_COMPLETE:
            return Object.assign({}, state, {
                [action.tabId]: state[action.tabId].map((request) => {
                    if(request.requestId === action.requestId) {
                        return {...request,
                            status: "complete",
                            endTime: action.timeStamp,
                            duraration: action.timeStamp - request.startTime,
                            isCloudinary: action.isCloudinary
                        }
                    } else {
                        return request;
                    }
                })
            });
        default:
          return state
    }
};