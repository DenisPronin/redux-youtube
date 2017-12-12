import React from 'react';
import PropTypes from 'prop-types'
import Spinner from "./Spinner";

export default class Comment extends React.Component {
  static propTypes = {
    itemId: PropTypes.string.isRequired,
    snippet: PropTypes.object.isRequired,
    replies: PropTypes.object,
    isThread: PropTypes.bool.isRequired,
    loadThreadReplies: PropTypes.func,
    toggleThreadReplies: PropTypes.func
  };

  loadComments = () => {
    const { itemId, replies, loadThreadReplies, toggleThreadReplies } = this.props;
    if (!replies) {
      loadThreadReplies(itemId);
    }
    toggleThreadReplies(itemId);
  };

  getReplies () {
    const { replies } = this.props;
    if (!replies) return null;
    if (!replies.isOpened) return null;

    if (replies.isPending) {
      return (
        <div>
          <Spinner size='2x' />
        </div>
      )
    }

    if (replies.response.items.length > 0) {
      return (
        <div className='comments'>
          {replies.response.items.map((item, i) => {
            return (
              <Comment
                key={`comment-reply--${i}`}
                itemId={item.id}
                snippet={item.snippet}
                replies={null}
                isThread={false}
              />
            )
          })}
        </div>
      )
    }
  }

  getRepliesButton () {
    const { isThread, replies } = this.props;
    if (!isThread) return null;

    const isOpened = replies && replies.isOpened;
    const buttonText = isOpened ? 'Hide replies' : 'View replies';
    const arrowDirection = isOpened ? 'up' : 'down';

    return (
      <button type='button' className='comment__replies-btn' onClick={this.loadComments}>
        {buttonText}
        <i className={`fa fa-angle-${arrowDirection}`} />
      </button>
    )
  }

  render () {
    const { snippet } = this.props;

    return (
      <div className='comment'>
        <img className='author__avatar' src={snippet.authorProfileImageUrl} alt=""/>
        <div>
          <a href={snippet.authorChannelUrl} target='_blank' className='author__title'>{snippet.authorDisplayName}</a>
          <div className='comment__text' dangerouslySetInnerHTML={{ __html: snippet.textDisplay }} />

          {this.getRepliesButton()}
          {this.getReplies()}
        </div>
      </div>
    );
  }
}
