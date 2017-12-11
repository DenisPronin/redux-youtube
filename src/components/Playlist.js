import React from 'react';
import PropTypes from 'prop-types'
import PlaylistItem from "./PlaylistItem";

export default class Playlist extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    selectVideo: PropTypes.func.isRequired
  };

  render () {
    const { data, selectVideo } = this.props;
    if (!data.items) return null;

    return (
      <div>
        {data.items.map((item, i) => {
          return (
            <PlaylistItem
              key={`video--${i}`}
              index={i}
              item={item}
              selectVideo={selectVideo}
            />
          )
        })}
      </div>
    );
  }
}
