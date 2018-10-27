import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from "redux-thunk";
import rootReducer, { IRootReducerState } from '../reducers/rootReducer';
import { IS_PRODUCTION } from '../utils';

const middleware = [thunk, logger];

function configureStore(initialState: Partial<IRootReducerState> = {}) {
    const store: any = IS_PRODUCTION ?
        createStore(rootReducer, initialState, applyMiddleware(...middleware)) :
        createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
    return store;
}

export default configureStore;
