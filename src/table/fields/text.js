import React from 'react';
import PropTypes from 'prop-types';

const Text = (props) => {
  const {
    value,
    name,
    onChange,
    id,
  } = props;

  return (<input type="text" value={value} name={name} onChange={onChange} data-id={id} />);
};

Text.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

Text.defaultProps = {
  value: '',
};
export default Text;

export const TextValidator = (schema, value) => {
  if (schema.optional !== true && (!value || value === '')) return false;
  return true;
};
