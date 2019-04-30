import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { getField } from './fields';

const Table = ({ data, schema, updateData }) => {
  const [editingData, setEditingData] = useState({});
  const [editingUpdated, setEditingUpdated] = useState({});

  const handleEditDone = (id) => {
    const newEditingData = Object.keys(editingData).reduce((result, key) => {
      if (key !== id) {
        Object.assign(result, { [key]: editingData[key] });
      }
      return result;
    }, {});
    setEditingData(newEditingData);
  };

  const handleSave = ({ target: { value } }) => {
    updateData(editingData[value]);
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
    setEditingUpdated({
      ...editingUpdated,
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
          disabled={editingUpdated[id] === false}
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
    // actions.push(<button type="button" onClick={} key={`${baseKey}-delete`}>Delete</button>);

    return actions;
  };

  const handleFieldChange = ({ target: { value, name, dataset: { id } } }) => {
    setEditingUpdated({
      ...editingUpdated,
      [id]: true,
    });
    setEditingData({
      ...editingData,
      [id]: {
        ...editingData[id],
        [name]: value,
      },
    });
  };

  const getCell = (item, key) => {
    const { id } = item;
    if (editingData[id]) {
      const Component = getField('text');
      return (
        <Component
          value={editingData[id][key]}
          name={key}
          id={id}
          onChange={handleFieldChange}
        />
      );
    }
    return item[key];
  };
  const getRow = (item) => {
    const { id } = item;
    const baseKey = `data-${id}-`;

    return (
      <tr key={id}>
        {schema.map(({ key }) => (
          <td key={`${baseKey}${key}`}>{getCell(item, key)}</td>
        ))}
        <td>
          {getActions(id)}
        </td>
      </tr>
    );
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
  updateData: PropTypes.func.isRequired,
};

export default Table;
