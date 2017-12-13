import React from 'react';
import PropTypes from 'prop-types'

export default class SearchBar extends React.Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    changeQuery: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired
  };

  onChangeQuery = (event) => {
    this.props.changeQuery(event.target.value);
  };

  onSearch = () => {
    this.props.search();
  };

  onEnterPress = (event) => {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  };

  render () {
    const { query } = this.props;

    return (
      <div className='searchbar'>
        <input
          className='searchbar__input'
          placeholder='Search'
          type="text"
          value={query}
          onKeyPress={this.onEnterPress}
          onChange={this.onChangeQuery}
        />
        <button type='button' className='searchbar__submit' onClick={this.onSearch}>
          <i className='fa fa-search' />
        </button>
      </div>
    );
  }
}
