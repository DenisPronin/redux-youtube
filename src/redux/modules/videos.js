import YoutubeApi from '../../api/youtubeApi'
import { loadThreads } from './comments'
/*
 * Constants
 * */
const LOAD_PLAYLIST = '@playlist / get list';
const LOAD_PLAYLIST_PENDING = LOAD_PLAYLIST + ' pending';
const LOAD_PLAYLIST_FULFILLED = LOAD_PLAYLIST + ' fulfilled';

const LOAD_PLAYLIST_NEXT_PAGE = '@playlist / get next page';
const LOAD_PLAYLIST_NEXT_PAGE_PENDING = LOAD_PLAYLIST_NEXT_PAGE + ' pending';
const LOAD_PLAYLIST_NEXT_PAGE_FULFILLED = LOAD_PLAYLIST_NEXT_PAGE + ' fulfilled';

const CHANGE_QUERY = '@search / change query';
const SELECT_VIDEO = '@video / select video';

/*
 * Actions
 * */
const loadPlaylistPending = (isPending) => ({
  type: LOAD_PLAYLIST_PENDING,
  isPending
});

const loadPlaylistFulfilled = (response) => ({
  type: LOAD_PLAYLIST_FULFILLED,
  response
});

const loadPlaylist = () =>  (dispatch, getState) => {
  const options = getState().videos.options;

  dispatch(loadPlaylistPending(true));

  YoutubeApi.search(options)
    .then((response) => {
      dispatch(loadPlaylistFulfilled(response));

      const items = getState().videos.response.items;
      let firstVideoId = null;
      if (items.length > 0) {
        firstVideoId = items[0].id.videoId;
        dispatch(selectVideo(firstVideoId));
      }

      dispatch(loadPlaylistPending(false));
    })
    .catch((error) => {
      dispatch(loadPlaylistPending(false));
    })
};

const loadPlaylistNextPagePending = (isPending) => ({
  type: LOAD_PLAYLIST_NEXT_PAGE_PENDING,
  isPending
});

const loadPlaylistNextPageFulfilled = (response) => ({
  type: LOAD_PLAYLIST_NEXT_PAGE_FULFILLED,
  response
});

const loadPlaylistNextPage = (pageToken) =>  (dispatch, getState) => {
  const options = getState().videos.options;

  dispatch(loadPlaylistNextPagePending(true));

  YoutubeApi.search({...options, pageToken})
    .then((response) => {
      dispatch(loadPlaylistNextPageFulfilled(response));
      dispatch(loadPlaylistNextPagePending(false));
    })
    .catch((error) => {
      dispatch(loadPlaylistNextPagePending(false));
    })
};

const changeQuery = (value) => ({
  type: CHANGE_QUERY,
  value
});

const _selectVideo = (videoId) => ({
  type: SELECT_VIDEO,
  videoId
});

const selectVideo = (videoId) =>  (dispatch) => {
  dispatch(_selectVideo(videoId));
  dispatch(loadThreads(videoId));
};

export const actions = {
  loadPlaylist,
  loadPlaylistNextPage,
  changeQuery,
  selectVideo
};

/*
 * State
 * */
const initialState = {
  options: {
    type: 'video',
    q: '',
    part: 'snippet',
    maxResults: '25',
    pageToken: ''
  },
  isPending: true,
  isPendingNextPage: false,
  activeVideoId: null,
  response: {}
};

/*
 * Reducers
 * */
export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_QUERY:
      return {
        ...state,
        options: {
          ...state.options,
          q: action.value
        }
      };

    case LOAD_PLAYLIST_PENDING:
      return {
        ...state,
        isPending: action.isPending
      };

    case LOAD_PLAYLIST_FULFILLED:
      return {
        ...state,
        response: action.response
      };

    case LOAD_PLAYLIST_NEXT_PAGE_PENDING:
      return {
        ...state,
        isPendingNextPage: action.isPending
      };

    case LOAD_PLAYLIST_NEXT_PAGE_FULFILLED:
      const oldResponse = state.response;
      const newResponse = action.response;
      const items = oldResponse.items.concat(newResponse.items);
      return {
        ...state,
        response: {
          ...oldResponse,
          items,
          nextPageToken: newResponse.nextPageToken,
          prevPageToken: newResponse.prevPageToken
        }
      };

    case SELECT_VIDEO:
      return {
        ...state,
        activeVideoId: action.videoId
      };

    default:
      return state;
  }
}
