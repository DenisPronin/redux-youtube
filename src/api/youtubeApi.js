export default {
  search (params) {
    return window.gapi.client.request({
      method: 'GET',
      path: '/youtube/v3/search',
      params
    }).then((response) => {
      console.log(response);
    });
  }
}
