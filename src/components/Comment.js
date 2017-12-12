import React from 'react';
import PropTypes from 'prop-types'
import Spinner from "./Spinner";

export default class Comment extends React.Component {
  static propTypes = {
    itemId: PropTypes.string.isRequired,
    snippet: PropTypes.object.isRequired,
    replies: PropTypes.object,
    isThread: PropTypes.bool.isRequired,
    loadThreadReplies: PropTypes.func
  };

  loadComments = () => {
    const { itemId, loadThreadReplies } = this.props;
    loadThreadReplies(itemId);
  };

  getReplies () {
    const { replies } = this.props;
    if (!replies) return null;

    if (replies.isPending) {
      return (
        <Spinner size='2x' />
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

  render () {
    const { snippet, isThread } = this.props;

    return (
      <div className='comment'>
        <img className='author__avatar' src={snippet.authorProfileImageUrl} alt=""/>
        <div>
          <a href={snippet.authorChannelUrl} target='_blank' className='author__title'>{snippet.authorDisplayName}</a>
          <div className='comment__text' dangerouslySetInnerHTML={{ __html: snippet.textDisplay }} />

          {isThread &&
            <button type='button' className='comment__replies-btn' onClick={this.loadComments}>
              View replies
              <i className='fa fa-angle-down' />
            </button>
          }

          {this.getReplies()}
        </div>
      </div>
    );
  }
}
