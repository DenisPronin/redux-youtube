import React from 'react';
import PropTypes from 'prop-types'

export default class NextPageButton extends React.Component {
  static propTypes = {
    nextPageToken: PropTypes.string.isRequired,
    onNextPage: PropTypes.func.isRequired
  };

  render() {
    const { nextPageToken, onNextPage } = this.props;
    if (!nextPageToken) return null;

    return (
      <button type='button' className='next-page-btn' onClick={onNextPage}>
        Next page
      </button>
    );
  }
}
