import TextField from './text';
// import NumberField from './number';
// import TextareaField from './textarea';

let fields = {
  text: TextField,
  number: TextField,
  textarea: TextField,
};

export const addFields = (type, renderer) => {
  fields = {
    ...fields,
    [type]: renderer,
  };
};
export const getField = type => (fields[type]);
