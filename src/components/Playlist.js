import React from 'react';
import PropTypes from 'prop-types'
import PlaylistItem from "./PlaylistItem";
import NextPageButton from "./NextPageButton";

export default class Playlist extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    selectVideo: PropTypes.func.isRequired,
    loadNextPage: PropTypes.func.isRequired
  };

  nextPage = () => {
    const { loadNextPage, data } = this.props;
    loadNextPage(data.nextPageToken);
  };

  render () {
    const { data, selectVideo } = this.props;
    if (!data.items) return null;

    return (
      <div className='playlist'>
        {data.items.map((item, i) => {
          return (
            <PlaylistItem
              key={`video--${i}`}
              item={item}
              selectVideo={selectVideo}
            />
          )
        })}

        <NextPageButton
          nextPageToken={data.nextPageToken}
          onNextPage={this.nextPage}
        />
      </div>
    );
  }
}
