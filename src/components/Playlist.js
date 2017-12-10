import React from 'react';
import PropTypes from 'prop-types'

export default class Playlist extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired
  };

  render() {
    return (
      <div>
        Playlist
      </div>
    );
  }
}
