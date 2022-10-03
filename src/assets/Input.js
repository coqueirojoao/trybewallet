import PropTypes from 'prop-types';
import React from 'react';

export default class Input extends React.Component {
  render() {
    const {
      type,
      onChange,
      children,
      placeholder,
      value,
      name,
      datatestid,
      minLength,
      className,
    } = this.props;
    return (
      <div>
        <label htmlFor={ name }>
          {children}
          <input
            type={ type }
            onChange={ onChange }
            placeholder={ placeholder }
            value={ value }
            name={ name }
            minLength={ minLength }
            data-testid={ datatestid }
            className={className}
          />
        </label>
      </div>
    );
  }
}

Input.propTypes = {
  children: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  datatestid: PropTypes.string.isRequired,
  minLength: PropTypes.string.isRequired,
};
