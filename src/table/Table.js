import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { getField, getFieldValidator, FIELD_STATE } from './fields';

const Table = (props) => {
  const {
    data,
    schema,
    updateItem,
    deleteItem,
    isAddingItem,
    addItem,
  } = props;

  const [editingData, setEditingData] = useState({});
  const [isEditingValid, setIsEditingValid] = useState({});

  const validateRow = row => (
    schema.every(item => getFieldValidator(item.type)(item, row[item.key]))
  );

  const handleEditDone = (id) => {
    const newEditingData = Object.keys(editingData).reduce((result, key) => {
      if (key !== id) {
        Object.assign(result, { [key]: editingData[key] });
      }
      return result;
    }, {});
    setEditingData(newEditingData);
  };

  const handleDelete = ({ target: { value } }) => {
    deleteItem(value);
  };

  const handleSave = ({ target: { value } }) => {
    updateItem(editingData[value]);
    handleEditDone(value);
  };

  const handleCancel = ({ target: { value } }) => {
    handleEditDone(value);
  };

  const handleEdit = ({ target: { value } }) => {
    setEditingData({
      ...editingData,
      [value]: {
        ...data.find(item => item.id === value),
      },
    });
    setIsEditingValid({
      ...isEditingValid,
      [value]: false,
    });
  };

  const getActions = (id) => {
    const baseKey = `data-${id}-actions-`;
    const actions = [];
    if (editingData[id]) {
      actions.push(
        <button
          type="button"
          onClick={handleSave}
          value={id}
          key={`${baseKey}-save`}
          disabled={isEditingValid[id] === false}
        >
          Save
        </button>,
        <button
          type="button"
          onClick={handleCancel}
          value={id}
          key={`${baseKey}-cancel`}
        >
          Cancel
        </button>,
      );
    } else {
      actions.push(<button type="button" onClick={handleEdit} value={id} key={`${baseKey}-edit`}>Edit</button>);
    }
    actions.push(<button type="button" onClick={handleDelete} value={id} key={`${baseKey}-delete`}>Delete</button>);

    return actions;
  };

  const handleFieldChange = ({ target: { value, name, dataset: { id } } }) => {
    const newData = {
      ...editingData[id],
      [name]: value,
    };
    setEditingData({
      ...editingData,
      [id]: newData,
    });

    setIsEditingValid({
      ...isEditingValid,
      [id]: validateRow(newData),
    });
  };

  const getCell = (schemaItem, item) => {
    const { type, key } = schemaItem;
    const { id } = item;
    if (editingData[id]) {
      const Component = getField(type);
      return (
        <Component
          value={editingData[id][key]}
          name={key}
          id={id}
          onChange={handleFieldChange}
          schema={schema}
        />
      );
    }
    const Component = getField(type, FIELD_STATE.DISPLAY);
    const value = item[key];
    return Component ? <Component value={value} /> : value;
  };
  const getRow = (item) => {
    const { id } = item;
    const baseKey = `data-${id}-`;

    return (
      <tr key={id}>
        {schema.map(schemaItem => (
          <td key={`${baseKey}${schemaItem.key}`}>{getCell(schemaItem, item)}</td>
        ))}
        <td>
          {getActions(id)}
        </td>
      </tr>
    );
  };

  const addingRowEditId = '__NEW_ROW__';
  if (isAddingItem && !editingData[addingRowEditId]) {
    setEditingData({
      ...editingData,
      [addingRowEditId]: schema.reduce((result, { key, defaults = '' }) => {
        Object.assign(result, { [key]: defaults });
        return result;
      }, { id: addingRowEditId }),
    });
    setIsEditingValid({
      ...isEditingValid,
      [addingRowEditId]: false,
    });
  }

  const getAddingRow = () => {
    if (editingData[addingRowEditId]) {
      const baseKey = 'data-new-row';
      const item = editingData[addingRowEditId];
      return (
        <tr key={baseKey}>
          {schema.map(schemaItem => (
            <td key={`${baseKey}-${schemaItem.key}`}>{getCell(schemaItem, item)}</td>
          ))}
          <td>
            <button
              type="button"
              onClick={() => {
                addItem(item);
                handleEditDone(addingRowEditId);
              }}
              key={`${baseKey}-save`}
              disabled={isEditingValid[addingRowEditId] === false}
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                addItem();
                handleEditDone(addingRowEditId);
              }}
              key={`${baseKey}-cancel`}
            >
              Cancel
            </button>
          </td>
        </tr>
      );
    }
    return null;
  };

  const getTableHead = () => (
    <thead>
      <tr>
        {schema.map(({ key, label = key }) => (<th key={key}>{label}</th>))}
        <th>Actions</th>
      </tr>
    </thead>
  );

  const getTableBody = () => (
    <tbody>
      {getAddingRow()}
      {data.map(getRow)}
    </tbody>
  );

  return (
    <table>
      {getTableHead()}
      {getTableBody()}
    </table>
  );
};

Table.propTypes = {
  schema: PropTypes.arrayOf(() => (true)).isRequired,
  data: PropTypes.arrayOf(() => (true)).isRequired,
  updateItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  isAddingItem: PropTypes.bool,
  addItem: PropTypes.func,
};

Table.defaultProps = {
  isAddingItem: false,
  addItem: () => {},
};

export default Table;
