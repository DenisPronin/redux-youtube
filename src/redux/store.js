import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import { rootReducers } from './root';

const initialState = {};
const middleware = [thunk];
let enhancers = [];

if (typeof window.devToolsExtension === 'function') {
  enhancers.push(window.devToolsExtension())
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

const store = createStore(
  rootReducers,
  initialState,
  composedEnhancers
);

export default store
