import React from 'react';
import PropTypes from 'prop-types'
import YouTube from 'react-youtube';

export default class Video extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    activeIndex: PropTypes.number
  };

  render() {
    const { data, activeIndex } = this.props;
    if (!data.items || !data.items[activeIndex]) return null;

    const videoItem = data.items[activeIndex];

    return (
      <div>
        <YouTube
          videoId={videoItem.id.videoId}
        />
      </div>
    );
  }
}
