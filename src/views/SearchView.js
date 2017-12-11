import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { rootActions } from '../redux/root'
import SearchBar from '../components/SearchBar'
import Playlist from "../components/Playlist";
import Video from "../components/Video";

class SearchView extends React.Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  componentWillMount () {
    this.loadYoutubeApi();
  }

  loadYoutubeApi() {
    const { actions, state } = this.props;
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";

    script.onload = () => {
      window.gapi.load('client', () => {
        actions.initGoogleApiClient().then(() => {
          actions.getPlaylist(state.videos.options);
        });
      });
    };

    document.body.appendChild(script);
  }

  initApp = () => {
    const { state, actions } = this.props;

    actions.initGoogleApiClient().then(() => {
      actions.getPlaylist(state.videos.options);
    });
  };

  render () {
    const { state, actions } = this.props;
    const { videos } = state;

    return (
      <div>
        <SearchBar
          query={videos.options.q}
          changeQuery={actions.changeQuery}
          search={actions.getPlaylist}
        />

        <Video
          data={videos.response}
          activeIndex={videos.activeIndex}
        />

        <Playlist
          data={videos.response}
          selectVideo={actions.selectVideo}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ state });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(rootActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchView)
