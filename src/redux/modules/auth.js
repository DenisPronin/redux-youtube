/*
 * Constants
 * */

/*
 * Actions
 * */
const initGoogleApiClient = () => (dispatch, getState) => {
  const {apiKey, clientId} = getState().common.auth;
  return window.gapi.client.init({
    apiKey,
    clientId,
    scope: 'https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner'
  });
};

export const actions = {
  initGoogleApiClient
};

/*
 * State
 * */
const initialState = {
  apiKey: 'AIzaSyBJmLormR4C2xAswelv3lilrX162asbMvI',
  clientId: '669297071060-mlelhfpl6f7vf7mcfo8f7fa35qr3hgh6.apps.googleusercontent.com'
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
