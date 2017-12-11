import YoutubeApi from "../../api/youtubeApi";

/*
 * Constants
 * */
const LOAD_VIDEO_COMMENTS = '@video / get comments';
const LOAD_VIDEO_COMMENTS_PENDING = LOAD_VIDEO_COMMENTS + ' pending';
const LOAD_VIDEO_COMMENTS_FULFILLED = LOAD_VIDEO_COMMENTS + ' fulfilled';

/*
 * Actions
 * */
const loadVideoCommentsPending = (isPending) => ({
  type: LOAD_VIDEO_COMMENTS_PENDING,
  isPending
});

const loadVideoCommentsFulfilled = (response) => ({
  type: LOAD_VIDEO_COMMENTS_FULFILLED,
  response
});

const loadVideoComments = (videoId) =>  (dispatch, getState) => {
  const options = getState().comments.options;

  dispatch(loadVideoCommentsPending(true));

  YoutubeApi.getComments({...options, videoId})
    .then((response) => {
      dispatch(loadVideoCommentsFulfilled(response));
      dispatch(loadVideoCommentsPending(false));
    })
    .catch((error) => {
      dispatch(loadVideoCommentsPending(false));
    })
};

export const actions = {
  loadVideoComments
};

/*
 * State
 * */
const initialState = {
  options: {
    part: 'snippet,replies',
    order: 'relevance'
  },
  isPending: '',
  response: {}
};

/*
 * Reducers
 * */
export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_VIDEO_COMMENTS_PENDING:
      return {
        ...state,
        isPending: action.isPending
      };

    case LOAD_VIDEO_COMMENTS_FULFILLED:
      return {
        ...state,
        response: action.response
      };

    default:
      return state;
  }
}
