import React from 'react';
import PropTypes from 'prop-types';
import { resolveCompare } from '../utils';

const NUMBER_ATTRIBUTES = ['min', 'max', 'step'];
const Number = (props) => {
  const {
    value,
    name,
    onChange,
    id,
  } = props;

  const numberAttributes = NUMBER_ATTRIBUTES.reduce((result, attrName) => {
    if (props[attrName] !== undefined) {
      Object.assign(result, { [attrName]: props[attrName] });
    }
    return result;
  }, {});

  return (
    <input
      type="number"
      value={value}
      name={name}
      onChange={onChange}
      data-id={id}
      {...numberAttributes}
    />
  );
};

Number.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

Number.defaultProps = {
  value: '',
};
export default Number;

export const NumberValidator = (schema, value) => {
  if (schema.optional !== true && (!value || value === '')) return false;
  return true;
};

export const NumberComparator = (key, order) => (
  (a, b) => {
    const [base, compareTo] = resolveCompare(order, a, b);

    return Number(base[key]) - Number(compareTo[key]);
  }
);
