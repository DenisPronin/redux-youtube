/*
 * Constants
 * */

/*
 * Actions
 * */
export const actions = {};

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
