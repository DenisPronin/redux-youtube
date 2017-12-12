import React from 'react';
import PropTypes from 'prop-types'
import Comment from "./Comment";

export default class CommentsThreads extends React.Component {
  static propTypes = {
    threads: PropTypes.object.isRequired
  };

  render () {
    const { threads } = this.props;
    if (!threads.items) return null;

    return (
      <div>
        {threads.items.map((item, i) => {
          return (
            <Comment
              key={`comment-thread--${i}`}
              item={item}
            />
          )
        })}
      </div>
    );
  }
}
