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
    const { actions } = this.props;
    actions.initGoogleApiClient().then(() => {
      actions.loadPlaylist();
    });
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
                  replies={comments.replies}
                  videoId={activeVideoId}
                  loadThreadReplies={actions.loadThreadReplies}
                  loadThreadsPage={actions.loadThreadsPage}
                  toggleThreadReplies={actions.toggleThreadReplies}
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
