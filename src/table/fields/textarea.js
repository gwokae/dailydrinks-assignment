import React from 'react';
import PropTypes from 'prop-types';

const TEXTAREA_ATTRIBUTES = ['rows', 'cols'];
const Textarea = (props) => {
  const {
    value,
    name,
    onChange,
    id,
  } = props;

  const atributes = TEXTAREA_ATTRIBUTES.reduce((result, attrName) => {
    if (props[attrName] !== undefined) {
      Object.assign(result, { [attrName]: props[attrName] });
    }
    return result;
  }, {});

  return (
    <textarea
      name={name}
      onChange={onChange}
      data-id={id}
      {...atributes}
    >
      {value}
    </textarea>
  );
};

Textarea.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

Textarea.defaultProps = {
  value: '',
};
export default Textarea;

export const TextareaValidator = (schema, value) => {
  if (schema.optional !== true && (!value || value === '')) return false;
  return true;
};

export const TextareaDisplayRenderer = ({ value }) => (<pre>{value}</pre>);

TextareaDisplayRenderer.propTypes = {
  value: PropTypes.string,
};

TextareaDisplayRenderer.defaultProps = {
  value: '',
};
