import { combineReducers } from 'redux'

import alerts, {actions as alertActions} from './modules/alerts'
import auth, {actions as authActions} from './modules/auth'
import videos, {actions as videosActions} from './modules/videos'

export const common = combineReducers({
  auth,
  alerts
});

export const rootReducers = combineReducers({
  common,
  videos
});

export const rootActions = Object.assign(
  {},
  alertActions,
  authActions,
  videosActions
);
