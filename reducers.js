
import { 
    ADD_ACTIVE_TAB, 
    ADD_REQUEST, 
    SET_REQUEST_COMPLETE,
	ADD_SCRAPED_DATA ,
	RESET_TAB_DATA
} from './actions.js';

export default (state = {}, action) => {
    switch (action.type) {
        case ADD_ACTIVE_TAB:
            return Object.assign({}, state, {
                [action.tabId]: []
            });
        case ADD_REQUEST:
            if (state[action.tabId]) {
	            const idx = state[action.tabId].findIndex(i => i.url === action.request.url),
	            clone = state[action.tabId].slice();

	            if (~idx){
		            clone[idx] = {...clone[idx], ...action.request};
	            }
	            else{
	            	clone.push(action.request);
	            }

                return Object.assign({}, state, {
                	[action.tabId]: clone, // [action.tabId]: ~idx ? clone[idx] = {...clone[idx], ...action.request} : clone.concat(action.request)  //[...state[action.tabId], action.request]
                });

            }else {
                return state;
            }
        case ADD_SCRAPED_DATA:
            if (state[action.tabId]) {
                const idx = state[action.tabId].findIndex(i => i.url === action.data.src)
                const clone = state[action.tabId].slice(); //[...state[action.tabId]]

	            if (!~idx){
	            	clone.push({data: action.data});
	            }
	            else{
		            clone[idx] = {...clone[idx], url: action.data.src, data: action.data}
	            }
    
                return Object.assign({}, state, {
                    [action.tabId]: clone  //[...state[action.tabId], clone]
                });

            } else {
                return state;
            }
        case SET_REQUEST_COMPLETE:
        	if (state[action.tabId]) {
		        return Object.assign({}, state, {
			        [action.tabId]: state[action.tabId].length ?
				        state[action.tabId].map((request) => {
					        if (request.requestId === action.requestId) {
						        return {
							        ...request,
							        status: "complete",
							        endTime: action.timeStamp,
							        duration: action.timeStamp - request.startTime,
							        isCloudinary: action.isCloudinary
						        }
					        } else {
						        return request;
					        }
				        }) :
				        [{
					        ...action.request,
					        status: "complete",
					        endTime: action.timeStamp,
					        duration: action.timeStamp - action.request.startTime,
					        isCloudinary: action.isCloudinary
				        }]
		        });
	        }
	        else{
        		return state;
	        }
	    case RESET_TAB_DATA:
	    	return Object.assign({}, state, {
	    		[action.tabId]: []
		    });

        default:
          return state
    }
};


