import React from 'react';
import PropTypes from 'prop-types'
import YouTube from 'react-youtube';

export default class Video extends React.Component {
  static propTypes = {
    videoId: PropTypes.string.isRequired
  };

  render() {
    const { videoId } = this.props;

    return (
      <div className='video'>
        <YouTube
          videoId={videoId}
        />
      </div>
    );
  }
}
