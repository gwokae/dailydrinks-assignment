import TextField, { TextValidator } from './text';
import NumberField, { NumberValidator } from './number';
// import TextareaField from './textarea';

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
    renderer: TextField,
    validator: TextValidator,
  },
};

export const addFields = (type, renderer, validator) => {
  fields = {
    ...fields,
    [type]: { renderer, validator },
  };
};
export const getField = type => (fields[type].renderer);
export const getFieldValidator = type => (fields[type].validator);
