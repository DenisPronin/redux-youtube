import YoutubeApi from '../../api/youtubeApi'
/*
 * Constants
 * */
export const GET_PLAYLIST = '@playlist / get list';
export const GET_PLAYLIST_PENDING = GET_PLAYLIST + ' pending';
export const GET_PLAYLIST_FULFILLED = GET_PLAYLIST + ' fulfilled';
export const CHANGE_QUERY = '@search / change query';
export const SELECT_VIDEO = '@video / select video';

/*
 * Actions
 * */
const getPlaylistPending = (isPending) => ({
  type: GET_PLAYLIST_PENDING,
  isPending
});

const getPlaylistFulfilled = (response) => ({
  type: GET_PLAYLIST_FULFILLED,
  response
});

const getPlaylist = () =>  (dispatch, getState) => {
  const options = getState().videos.options;

  dispatch(getPlaylistPending(true));

  YoutubeApi.search(options)
    .then((response) => {
      dispatch(getPlaylistFulfilled(response));
      dispatch(getPlaylistPending(false));
    })
    .catch((error) => {
      dispatch(getPlaylistPending(false));
    })
};

const changeQuery = (value) => ({
  type: CHANGE_QUERY,
  value
});

const selectVideo = (index) => ({
  type: SELECT_VIDEO,
  index
});

export const actions = {
  getPlaylist,
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
  isPending: '',
  activeIndex: null,
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

    case GET_PLAYLIST_PENDING:
      return {
        ...state,
        isPending: action.isPending
      };

    case GET_PLAYLIST_FULFILLED:
      return {
        ...state,
        response: action.response
      };

    case SELECT_VIDEO:
      return {
        ...state,
        activeIndex: action.index
      };

    default:
      return state;
  }
}
