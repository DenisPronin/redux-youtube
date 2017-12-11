import React from 'react';
import PropTypes from 'prop-types'

export default class PlaylistItem extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
    selectVideo: PropTypes.func.isRequired
  };

  selectVideo = () => {
    const { index, selectVideo } = this.props;
    selectVideo(index);
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
