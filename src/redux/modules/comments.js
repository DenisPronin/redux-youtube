import YoutubeApi from "../../api/youtubeApi";

/*
 * Constants
 * */
const LOAD_THREADS = '@video / get threads';
const LOAD_THREADS_PENDING = LOAD_THREADS + ' pending';
const LOAD_THREADS_FULFILLED = LOAD_THREADS + ' fulfilled';

const LOAD_THREADS_PAGE = '@video / get threads page';
const LOAD_THREADS_PAGE_PENDING = LOAD_THREADS_PAGE + ' pending';
const LOAD_THREADS_PAGE_FULFILLED = LOAD_THREADS_PAGE + ' fulfilled';

const LOAD_THREAD_REPLIES = '@video / get thread replies';
const LOAD_THREAD_REPLIES_PENDING = LOAD_THREAD_REPLIES + ' pending';
const LOAD_THREAD_REPLIES_FULFILLED = LOAD_THREAD_REPLIES + ' fulfilled';
const TOGGLE_THREAD_REPLIES = '@video / toggle thread replies';

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

export const loadThreads = (videoId) =>  (dispatch, getState) => {
  const options = getState().comments.options.threads;

  dispatch(loadThreadsPending(true));

  YoutubeApi.getThreads({...options, videoId})
    .then((response) => {
      dispatch(loadThreadsFulfilled(response));
      dispatch(loadThreadsPending(false));
    })
    .catch((error) => {
      dispatch(loadThreadsPending(false));
    })
};

const loadThreadsPagePending = (isPending) => ({
  type: LOAD_THREADS_PAGE_PENDING,
  isPending
});

const loadThreadsPageFulfilled = (response) => ({
  type: LOAD_THREADS_PAGE_FULFILLED,
  response
});

const loadThreadsPage = (videoId, pageToken) =>  (dispatch, getState) => {
  const options = getState().comments.options.threads;

  dispatch(loadThreadsPagePending(true));

  YoutubeApi.getThreads({...options, videoId, pageToken})
    .then((response) => {
      dispatch(loadThreadsPageFulfilled(response));
      dispatch(loadThreadsPagePending(false));
    })
    .catch((error) => {
      dispatch(loadThreadsPagePending(false));
    })
};

const loadThreadRepliesPending = (threadId, isPending) => ({
  type: LOAD_THREAD_REPLIES_PENDING,
  threadId,
  isPending
});

const loadThreadRepliesFulfilled = (threadId, response) => ({
  type: LOAD_THREAD_REPLIES_FULFILLED,
  threadId,
  response
});

const toggleThreadReplies = (threadId) => ({
  type: TOGGLE_THREAD_REPLIES,
  threadId
});

const loadThreadReplies = (threadId) =>  (dispatch, getState) => {
  const options = getState().comments.options.replies;

  dispatch(loadThreadRepliesPending(threadId, true));

  YoutubeApi.getThreadReplies({...options, parentId: threadId})
    .then((response) => {
      dispatch(loadThreadRepliesFulfilled(threadId, response));
      dispatch(loadThreadRepliesPending(threadId, false));
    })
    .catch((error) => {
      dispatch(loadThreadRepliesPending(threadId, false));
    })
};

export const actions = {
  loadThreads,
  loadThreadReplies,
  toggleThreadReplies,
  loadThreadsPage
};

/*
 * State
 * */
const initialState = {
  options: {
    threads: {
      part: 'snippet,replies',
      order: 'relevance'
    },
    replies: {
      part: 'snippet'
    }
  },
  isPending: '',
  isPendingPage: false,
  threads: {},
  replies: {}
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
        threads: action.response
      };

    case LOAD_THREADS_PAGE_PENDING:
      return {
        ...state,
        isPendingPage: action.isPending
      };

    case LOAD_THREADS_PAGE_FULFILLED:
      const oldResponse = state.threads;
      const newResponse = action.response;
      const items = oldResponse.items.concat(newResponse.items);
      return {
        ...state,
        threads: {
          ...oldResponse,
          items,
          nextPageToken: newResponse.nextPageToken
        }
      };

    case LOAD_THREAD_REPLIES_PENDING:
      return loadThreadRepliesPendingReducer(state, action);

    case LOAD_THREAD_REPLIES_FULFILLED:
      return loadThreadRepliesReducer(state, action);

    case TOGGLE_THREAD_REPLIES:
      return toggleThreadRepliesReducer(state, action);

    default:
      return state;
  }
}

const loadThreadRepliesPendingReducer = (state, action) => {
  const { threadId, isPending } = action;
  let replies = {
    ...state.replies
  };
  if (!replies[threadId]) {
    replies[threadId] = {
      isOpened: false,
      response: {}
    };
  }
  replies[threadId].isPending = isPending;

  return {
    ...state,
    replies
  };
};

const loadThreadRepliesReducer = (state, action) => {
  const { threadId, response } = action;
  let replies = {
    ...state.replies
  };
  replies[threadId] = {
    ...replies[threadId],
    response
  };

  return {
    ...state,
    replies
  }
};

const toggleThreadRepliesReducer = (state, action) => {
  const { threadId } = action;
  let replies = {
    ...state.replies
  };
  replies[threadId] = {
    ...replies[threadId],
    isOpened: !replies[threadId].isOpened
  };

  return {
    ...state,
    replies
  }
};
