import React from 'react';
import PropTypes from 'prop-types'

export default class Comment extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    isThread: PropTypes.bool.isRequired,
    loadThreadComments: PropTypes.func.isRequired
  };

  loadComments = () => {
    const { item, loadThreadComments } = this.props;
    loadThreadComments(item.id);
  };

  render () {
    const { item, isThread } = this.props;

    return (
      <div>
        <div>{item.id} / {item.snippet.topLevelComment.snippet.textDisplay}</div>
        {isThread &&
          <button type='button' onClick={this.loadComments}>Load comments</button>
        }
      </div>
    );
  }
}
