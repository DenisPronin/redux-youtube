import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import { rootReducers } from './root';

const initialState = {};
const middleware = [thunk];
let enhancers = [];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
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
