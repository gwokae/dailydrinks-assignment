import TextField, { TextValidator } from './text';
import NumberField, { NumberValidator } from './number';
import TextareaField, { TextareaDisplayRenderer, TextareaValidator } from './textarea';

let fields = {
  text: {
    renderer: TextField,
    validator: TextValidator,
  },
  number: {
    renderer: NumberField,
    validator: NumberValidator,
  },
  textarea: {
    renderer: TextareaField,
    validator: TextareaValidator,
    displayRenderer: TextareaDisplayRenderer,
  },
};

export const addFields = (type, renderer, validator) => {
  fields = {
    ...fields,
    [type]: { renderer, validator },
  };
};
export const FIELD_STATE = {
  EDIT: 'renderer',
  DISPLAY: 'displayRenderer',
};
export const getField = (type, state = FIELD_STATE.EDIT) => (fields[type][state]);
export const getFieldValidator = type => (fields[type].validator);
