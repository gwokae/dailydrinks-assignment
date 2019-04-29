import React from 'react';
// import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { getField } from './fields';

class Table extends React.Component {
  static propTypes = {
    config: PropTypes.objectOf(() => (true)).isRequired,
    data: PropTypes.arrayOf(() => (true)).isRequired,
    onFieldChange: PropTypes.func.isRequired,
  }

  static editTempKey = '_editing';

  getTableHead() {
    const { config: { fields } } = this.props;
    return (
      <thead>
        <tr>
          {fields.map(({ key, label = key }) => (<th key={key}>{label}</th>))}
          <th>Actions</th>
        </tr>
      </thead>
    );
  }

  getTableBody() {
    const { data } = this.props;
    return (
      <tbody>
        {data.map(item => (this.getTableItem(item)))}
      </tbody>
    );
  }

  getTableItem(data) {
    const { config: { fields, actions } } = this.props;
    const { id } = data;
    const baseKey = `data-${id}`;
    return (
      <tr key={id}>
        {fields.map(({ key }) => (
          <td key={`${baseKey}-${key}`}>{this.getTableItemCell(data, key)}</td>
        ))}
        <td>
          {actions
            .filter(action => !(typeof action.visible === 'function') || action.visible(data))
            .map(({ name, handler }) => (
              <button type="button" onClick={() => handler(data)} key={`${baseKey}-${name}`}>{name}</button>
            ))
          }
        </td>
      </tr>
    );
  }

  getTableItemCell(data, key) {
    if (data[Table.editTempKey]) {
      const Component = getField('text');
      const { onFieldChange } = this.props;
      return (
        <Component
          value={data[Table.editTempKey][key]}
          onChange={({ target: { value } }) => onFieldChange(data, key, value)}
        />
      );
    }
    return data[key];
  }

  render() {
    return (
      <table>
        { this.getTableHead() }
        { this.getTableBody() }
      </table>
    );
  }
}

export default Table;
