import React from 'react';
import PropTypes from 'prop-types'

export default class Comment extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  };

  render () {
    const { item } = this.props;

    return (
      <div>
        {item.id} / {item.snippet.topLevelComment.snippet.textDisplay}
      </div>
    );
  }
}
