import YoutubeApi from "../../api/youtubeApi";

/*
 * Constants
 * */
const LOAD_THREADS = '@video / get comments';
const LOAD_THREADS_PENDING = LOAD_THREADS + ' pending';
const LOAD_THREADS_FULFILLED = LOAD_THREADS + ' fulfilled';

/*
 * Actions
 * */
const loadThreadsPending = (isPending) => ({
  type: LOAD_THREADS_PENDING,
  isPending
});

const loadThreadsFulfilled = (response) => ({
  type: LOAD_THREADS_FULFILLED,
  response
});

const loadThreads = (videoId) =>  (dispatch, getState) => {
  const options = getState().comments.options;

  dispatch(loadThreadsPending(true));

  YoutubeApi.getComments({...options, videoId})
    .then((response) => {
      dispatch(loadThreadsFulfilled(response));
      dispatch(loadThreadsPending(false));
    })
    .catch((error) => {
      dispatch(loadThreadsPending(false));
    })
};

export const actions = {
  loadThreads
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
    case LOAD_THREADS_PENDING:
      return {
        ...state,
        isPending: action.isPending
      };

    case LOAD_THREADS_FULFILLED:
      return {
        ...state,
        response: action.response
      };

    default:
      return state;
  }
}
