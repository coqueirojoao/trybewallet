import PropTypes from 'prop-types';
import React from 'react';

export default class Button extends React.Component {
  render() {
    const { onClick, children, disabled, datatestid, className } = this.props;
    return (
      <button
        type="button"
        onClick={ onClick }
        disabled={ disabled }
        data-testid={ datatestid }
        className={className}
      >
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  datatestid: PropTypes.string.isRequired,
};
