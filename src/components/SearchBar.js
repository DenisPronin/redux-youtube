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

  render () {
    const { query } = this.props;

    return (
      <div>
        <input type="text" value={query} onChange={this.onChangeQuery}/>
        <button type='button' onClick={this.onSearch}>Search</button>
      </div>
    );
  }
}
