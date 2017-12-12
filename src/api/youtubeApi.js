export default {
  search (params) {
    return window.gapi.client.request({
      method: 'GET',
      path: '/youtube/v3/search',
      params
    }).then((response) => response.result);
  },

  getThreads (params) {
    return window.gapi.client.request({
      method: 'GET',
      path: '/youtube/v3/commentThreads',
      params
    }).then((response) => response.result);
  },

  getThreadComments (params) {
    return window.gapi.client.request({
      method: 'GET',
      path: '/youtube/v3/comments',
      params
    }).then((response) => response.result);
  }
}
