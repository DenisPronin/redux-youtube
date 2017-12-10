import React from 'react';
import PropTypes from 'prop-types'

export default class SearchBar extends React.Component {
  static propTypes = {
    query: PropTypes.string.isRequired
  };

  render() {
    return (
      <div>
        searchbar
      </div>
    );
  }
}
