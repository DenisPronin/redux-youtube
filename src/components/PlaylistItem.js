import React from 'react';
import PropTypes from 'prop-types'

export default class PlaylistItem extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    selectVideo: PropTypes.func.isRequired
  };

  selectVideo = () => {
    const { item, selectVideo } = this.props;
    selectVideo(item.id.videoId);
  };

  render () {
    const { item } = this.props;
    const snippet = item.snippet;

    return (
      <div className='playlist-item' onClick={this.selectVideo}>
        <img className='playlist-item__preview' src={snippet.thumbnails.medium.url} alt='' />
        <div>
          <div className='playlist-item__title'>{snippet.title}</div>
          <div className='playlist-item__channel-title'>{snippet.channelTitle}</div>
        </div>
      </div>
    );
  }
}
