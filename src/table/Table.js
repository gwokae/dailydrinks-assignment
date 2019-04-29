import React from 'react';
// import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { getField } from './fields';

class Table extends React.Component {
  static propTypes = {
    schema: PropTypes.objectOf(() => (true)).isRequired,
    data: PropTypes.arrayOf(() => (true)).isRequired,
    updateData: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      editingData: {},
      editingUpdated: {},
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  getTableHead() {
    const { schema } = this.props;
    return (
      <thead>
        <tr>
          {schema.map(({ key, label = key }) => (<th key={key}>{label}</th>))}
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
    const { schema } = this.props;
    const { id } = data;
    const baseKey = `data-${id}-`;

    return (
      <tr key={id}>
        {schema.map(({ key }) => (
          <td key={`${baseKey}${key}`}>{this.getTableItemCell(data, key)}</td>
        ))}
        <td>
          {this.getActions(data)}
        </td>
      </tr>
    );
  }

  getActions({ id }) {
    const { editingData, editingUpdated } = this.state;
    const baseKey = `data-${id}-actions-`;
    const actions = [];
    if (editingData[id]) {
      actions.push(
        <button
          type="button"
          onClick={this.handleSave}
          value={id}
          key={`${baseKey}-save`}
          disabled={editingUpdated[id] !== false}
        >
          Save
        </button>,
        <button
          type="button"
          onClick={this.handleCancel}
          value={id}
          key={`${baseKey}-cancel`}
        >
          Cancel
        </button>,
      );
    } else {
      actions.push(<button type="button" onClick={this.handleEdit} value={id} key={`${baseKey}-edit`}>Edit</button>);
    }
    // actions.push(<button type="button" onClick={} key={`${baseKey}-delete`}>Delete</button>);

    return actions;
  }

  getTableItemCell(data, key) {
    const { id } = data;
    const { editingData } = this.state;
    if (editingData[id]) {
      const Component = getField('text');
      return (
        <Component
          value={editingData[id][key]}
          name={key}
          onChange={({ target: { value, name } }) => this.setState({
            editingData: {
              ...editingData,
              [id]: {
                ...editingData[id],
                [name]: value,
              },
            },
          })}
        />
      );
    }
    return data[key];
  }

  handleEditDone(id) {
    const { editingData } = this.state;
    const newEditingData = Object.keys(editingData).reduce((result, key) => {
      if (key !== id) {
        Object.assign(result, { [key]: editingData[key] });
      }
      return result;
    }, {});
    this.setState({ editingData: newEditingData });
  }

  handleSave({ target: { value } }) {
    const { updateData } = this.props;
    const { editingData } = this.state;
    updateData(editingData[value]);
    this.handleEditDone(value);
  }

  handleCancel({ target: { value } }) {
    this.handleEditDone(value);
  }

  handleEdit({ target: { value } }) {
    const { editingData, editingUpdated } = this.state;
    const { data } = this.props;
    this.setState({
      editingData: {
        ...editingData,
        [value]: {
          ...data.find(item => item.id === value),
        },
      },
      editingUpdated: {
        ...editingUpdated,
        [value]: false,
      },
    });
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
