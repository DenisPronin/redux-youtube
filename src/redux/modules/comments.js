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
    videoId: '',
    part: 'snippet,replies'
  },
  isPending: '',
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
