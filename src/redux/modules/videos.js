import YoutubeApi from '../../api/youtubeApi'
/*
 * Constants
 * */
export const GET_PLAYLIST = '@playlist / get list';

/*
 * Actions
 * */
const getPlaylist = (options) =>  (dispatch) => {
  YoutubeApi.search(options)
};

export const actions = {
  getPlaylist
};

/*
 * State
 * */
const initialState = {
  options: {
    type: 'video',
    query: '',
    part: 'snippet',
    maxResults: '25',
    pageToken: ''
  },
  isPending: '',
  activeIndex: '',
  response: {}
};

/*
 * Reducers
 * */
export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}
