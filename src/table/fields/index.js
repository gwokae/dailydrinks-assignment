import TextField from './text';
import NumberField from './number';
import TextareaField, { TextareaDisplayRenderer } from './textarea';
import { resolveCompare } from '../utils';

export const defaultValidator = (schema, value) => {
  if (schema.optional !== true && (!value || value === '')) return false;
  return true;
};

export const defaultComparator = (key, order) => (
  (a, b) => {
    const [base, compareTo] = resolveCompare(order, a, b);
    return base[key].toString().localeCompare(compareTo[key].toString());
  }
);

let fields = {};

export const addFields = (type, props) => {
  const {
    renderer,
    displayRenderer,
    validator = defaultValidator,
    comparator = defaultComparator,
  } = props;

  fields = {
    ...fields,
    [type]: {
      renderer,
      displayRenderer,
      validator,
      comparator,
    },
  };
};

addFields('text', { renderer: TextField });
addFields('number', { renderer: NumberField });
addFields('textarea', { renderer: TextareaField, displayRenderer: TextareaDisplayRenderer });

export const RETURN_TYPES = {
  EDIT: 'renderer',
  DISPLAY: 'displayRenderer',
  VALIDATOR: 'validator',
  COMPARATOR: 'comparator',
};
export const getField = (type, state = RETURN_TYPES.EDIT) => (fields[type][state]);
