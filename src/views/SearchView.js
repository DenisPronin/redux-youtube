import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { rootActions } from '../redux/root'
import SearchBar from '../components/SearchBar'
import Playlist from "../components/Playlist";
import Video from "../components/Video";
import CommentsThreads from "../components/CommentsThreads";
import Spinner from "../components/Spinner";

class SearchView extends React.Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  componentWillMount () {
    this.loadYoutubeApi();
  }

  loadYoutubeApi() {
    const { actions } = this.props;
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";

    script.onload = () => {
      window.gapi.load('client', () => {
        actions.initGoogleApiClient().then(() => {
          actions.loadPlaylist();
        });
      });
    };

    document.body.appendChild(script);
  }

  selectVideo = (videoId) => {
    const { actions } = this.props;
    actions.selectVideo(videoId);
  };

  render () {
    const { state, actions } = this.props;
    const { videos, comments } = state;
    const activeVideoId = videos.activeVideoId;

    return (
      <div className='page'>
        <SearchBar
          query={videos.options.q}
          changeQuery={actions.changeQuery}
          search={actions.loadPlaylist}
        />

        {videos.isPending &&
          <Spinner size='5x' />
        }

        {!videos.isPending &&
          <div className='page-content'>
            {activeVideoId &&
            <div className='video-content'>
              <Video
                videoId={activeVideoId}
              />

              <CommentsThreads
                threads={comments.threads}
                comments={comments.comments}
                videoId={activeVideoId}
                loadThreadComments={actions.loadThreadComments}
                loadThreadsPage={actions.loadThreadsPage}
              />
            </div>
            }

            <Playlist
              data={videos.response}
              selectVideo={this.selectVideo}
              loadNextPage={actions.loadPlaylistNextPage}
            />
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ state });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(rootActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchView)
