import { combineReducers } from 'redux'

import alerts, {actions as alertActions} from './modules/alerts'
import auth, {actions as authActions} from './modules/auth'
import videos, {actions as videosActions} from './modules/videos'
import comments, {actions as commentsActions} from './modules/comments'

export const common = combineReducers({
  auth,
  alerts
});

export const rootReducers = combineReducers({
  common,
  videos,
  comments
});

export const rootActions = Object.assign(
  {},
  alertActions,
  authActions,
  videosActions,
  commentsActions
);
