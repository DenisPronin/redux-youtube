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

    return (
      <div onClick={this.selectVideo}>
        {item.id.videoId}
      </div>
    );
  }
}
