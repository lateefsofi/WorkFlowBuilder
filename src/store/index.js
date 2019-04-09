
import { combineReducers } from 'redux';

import LoaderReducer from './loader/reducer';
import AuthReducer from './auth/reducer';

// import registerServiceWorker from './registerServiceWorker';
// const logger = store => { // middleware
//     return next => {
//         return action => {
//             console.log('[Middleware] Dispatching', action);
//             const result = next(action);
//             console.log('[Middleware] next state', store.getState());
//             return result;
//         }
//     }
// };

const rootReducer = combineReducers({
    LoaderReducer,
    AuthReducer
});

export default rootReducer;
