import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getField, RETURN_TYPES } from './fields';
import { SORT_ORDER } from './utils';

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
  const [sortField, setSortField] = useState();
  const [sortOrder, setSortOrder] = useState();

  const toggleSort = ({ target: { dataset: { key } } }) => {
    if (key === sortField) {
      switch (sortOrder) {
        case SORT_ORDER.ASC:
          setSortOrder(SORT_ORDER.DESC);
          break;
        case SORT_ORDER.DESC:
          setSortField();
          break;
        default:
          setSortOrder(SORT_ORDER.ASC);
      }
    } else {
      setSortField(key);
      setSortOrder(SORT_ORDER.ASC);
    }
  };

  const getComparator = () => {
    if (sortField) {
      const { key, type } = schema.find(item => item.key === sortField);
      return getField(type, RETURN_TYPES.COMPARATOR)(key, sortOrder);
    }
    return () => (0);
  };

  const validateRow = row => (
    schema.every(item => getField(item.type, RETURN_TYPES.VALIDATOR)(item, row[item.key]))
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
          data-icon="💾"
        >
          Save
        </button>,
        <button
          type="button"
          onClick={handleCancel}
          value={id}
          key={`${baseKey}-cancel`}
          data-icon="🧹"
        >
          Cancel
        </button>,
      );
    } else {
      actions.push(<button type="button" onClick={handleEdit} value={id} key={`${baseKey}-edit`} data-icon="✏">Edit</button>);
    }
    actions.push(<button type="button" onClick={handleDelete} value={id} key={`${baseKey}-delete`} data-icon="🗑">Delete</button>);

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
    const Component = getField(type, RETURN_TYPES.DISPLAY);
    const value = item[key];
    return Component ? <Component value={value} /> : value;
  };
  const getRow = (item) => {
    const { id } = item;
    const baseKey = `data-${id}-`;

    return (
      <tr key={id}>
        {schema.map(schemaItem => (
          <td
            key={`${baseKey}${schemaItem.key}`}
            data-label={schemaItem.label || schemaItem.key}
          >
            {getCell(schemaItem, item)}
          </td>
        ))}
        <td className="actions">
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
            <td key={`${baseKey}-${schemaItem.key}`} data-label={schemaItem.label || schemaItem.key}>
              {getCell(schemaItem, item)}
            </td>
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
              data-icon="💾"
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
              data-icon="🧹"
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
        {
          schema.map(({ key, label = key, sortable = false }) => {
            const attributes = {};
            if (sortable) {
              if (key === sortField) {
                attributes.className = `sortable sort-${sortOrder}`;
              } else {
                attributes.className = 'sortable';
              }
              attributes.onClick = toggleSort;
            }
            return (
              <th key={key} data-key={key} {...attributes}>
                {label}
              </th>
            );
          })
        }
        <th>Actions</th>
      </tr>
    </thead>
  );

  const getTableBody = () => {
    const comparator = getComparator();
    return (
      <tbody>
        {getAddingRow()}
        {[...data].sort(comparator).map(getRow)}
      </tbody>
    );
  };

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
