import React from 'react';
import PropTypes from 'prop-types'

export default class Spinner extends React.Component {
  static propTypes = {
    size: PropTypes.string.isRequired
  };

  render() {
    const { size } = this.props;
    const classes = `fa fa-circle-o-notch fa-${size} fa-spin`;

    return (
      <i className={classes} />
    );
  }
}
