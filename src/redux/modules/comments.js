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

const LOAD_THREAD_COMMENTS = '@video / get thread comments';
const LOAD_THREAD_COMMENTS_PENDING = LOAD_THREAD_COMMENTS + ' pending';
const LOAD_THREAD_COMMENTS_FULFILLED = LOAD_THREAD_COMMENTS + ' fulfilled';

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
  type: LOAD_THREADS_PENDING,
  isPending
});

const loadThreadsPageFulfilled = (response) => ({
  type: LOAD_THREADS_FULFILLED,
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

const loadThreadCommentsPending = (threadId, isPending) => ({
  type: LOAD_THREAD_COMMENTS_PENDING,
  threadId,
  isPending
});

const loadThreadCommentsFulfilled = (threadId, response) => ({
  type: LOAD_THREAD_COMMENTS_FULFILLED,
  threadId,
  response
});

const loadThreadComments = (threadId) =>  (dispatch, getState) => {
  const options = getState().comments.options.comments;

  dispatch(loadThreadCommentsPending(threadId, true));

  YoutubeApi.getThreadComments({...options, parentId: threadId})
    .then((response) => {
      dispatch(loadThreadCommentsFulfilled(threadId, response));
      dispatch(loadThreadCommentsPending(threadId, false));
    })
    .catch((error) => {
      dispatch(loadThreadCommentsPending(threadId, false));
    })
};

export const actions = {
  loadThreads,
  loadThreadComments,
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
    comments: {
      part: 'snippet'
    }
  },
  isPending: '',
  isPendingPage: false,
  threads: {},
  comments: {}
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
          nextPageToken: newResponse.nextPageToken,
          prevPageToken: newResponse.prevPageToken
        }
      };

    case LOAD_THREAD_COMMENTS_PENDING:
      return loadThreadCommentsPendingReducer(state, action);

    case LOAD_THREAD_COMMENTS_FULFILLED:
      return loadThreadCommentsReducer(state, action);

    default:
      return state;
  }
}

const loadThreadCommentsPendingReducer = (state, action) => {
  const { threadId, isPending } = action;
  let comments = {
    ...state.comments
  };
  if (!comments[threadId]) {
    comments[threadId] = {
      response: {}
    };
  }
  comments[threadId].isPending = isPending;

  return {
    ...state,
    comments
  };
};

const loadThreadCommentsReducer = (state, action) => {
  const { threadId, response } = action;
  let comments = {
    ...state.comments
  };
  comments[threadId] = {
    ...comments[threadId],
    response
  };

  return {
    ...state,
    comments
  }
};
