import React from 'react';
// import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Table extends React.Component {
  static propTypes = {
    config: PropTypes.objectOf(() => (true)).isRequired,
    data: PropTypes.arrayOf(() => (true)).isRequired,
  }

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
    return (
      <tr key={id}>
        {fields.map(({ key }) => (
          <td key={`data-${id}-${key}`}>{data[key]}</td>
        ))}
        <td>
          {actions.map(({ name, handler }) => (<button type="button" onClick={handler}>{name}</button>))}
        </td>
      </tr>
    );
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
