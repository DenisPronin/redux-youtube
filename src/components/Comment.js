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
    const snippet = item.snippet.topLevelComment.snippet;

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
        </div>
      </div>
    );
  }
}
