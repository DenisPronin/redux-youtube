import React from 'react';
import PropTypes from 'prop-types'
import Comment from "./Comment";

export default class CommentsThreads extends React.Component {
  static propTypes = {
    threads: PropTypes.object.isRequired,
    replies: PropTypes.object.isRequired,
    videoId: PropTypes.string.isRequired,
    loadThreadReplies: PropTypes.func.isRequired,
    loadThreadsPage: PropTypes.func.isRequired,
    toggleThreadReplies: PropTypes.func.isRequired
  };

  nextPage = () => {
    const { loadThreadsPage, threads, videoId } = this.props;
    loadThreadsPage(videoId, threads.nextPageToken);
  };

  render () {
    const { threads, replies, loadThreadReplies, toggleThreadReplies } = this.props;
    if (!threads.items) return null;

    return (
      <div className='comments'>
        {threads.items.map((item, i) => {
          return (
            <Comment
              key={`comment-thread--${i}`}
              itemId={item.id}
              snippet={item.snippet.topLevelComment.snippet}
              replies={replies[item.id]}
              isThread
              loadThreadReplies={loadThreadReplies}
              toggleThreadReplies={toggleThreadReplies}
            />
          )
        })}
        {threads.nextPageToken &&
          <button type='button' onClick={this.nextPage}>
            Next page
          </button>
        }
      </div>
    );
  }
}
