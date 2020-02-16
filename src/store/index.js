
import { combineReducers } from 'redux';

import LoaderReducer from './loader/reducer';
import AuthReducer from './auth/reducer';
import BotBuilderReducer from './bot-builder/reducer';
import BotListReducer from './bot-list/reducer';
import MetaDataReducer from './meta-data/reducer';

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
    AuthReducer,
    BotBuilderReducer,
    BotListReducer,
    MetaDataReducer
});

export default rootReducer;
