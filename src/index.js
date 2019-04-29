import React from 'react';
import ReactDOM from 'react-dom';

import Table from './table/Table';
import './styles.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);

    this.state = {
      data: [
        {
          id: 1,
          name: 'John Doe',
          price: 123,
          notes: 'Hello World',
        },
      ],
      config: {
        fields: [
          { key: 'name', type: 'text' },
          { key: 'price', type: 'number' },
          { key: 'notes', type: 'textarea' },
        ],
        actions: [
          {
            name: 'Edit',
            visible: data => !data[Table.editTempKey],
            handler: this.handleEditClick,
          },
          {
            name: 'Save',
            visible: data => !!data[Table.editTempKey],
            handler: this.handleSaveClick,
          },
          {
            name: 'Cancel',
            visible: data => !!data[Table.editTempKey],
            handler: this.handleCancelClick,
          },
          { name: 'Delete' },
        ],
      },
    };
  }

  getItemData(item) {
    const { config } = this.state;
    return config.fields
      .reduce((result, { key }) => Object.assign(result, { [key]: item[key] }), {});
  }

  updateDataState(data) {
    const { id } = data;
    const { data: stateData } = this.state;

    this.setState({
      data: stateData.map((item) => {
        if (item.id === id) {
          return { ...data };
        }
        return item;
      }),
    });
  }

  handleEditClick(data) {
    const { id } = data;
    const itemData = this.getItemData(data);
    this.updateDataState({
      id,
      ...itemData,
      [Table.editTempKey]: { ...itemData },
    });
  }

  handleSaveClick(data) {
    const { id } = data;
    const itemData = this.getItemData(data[Table.editTempKey]);
    this.updateDataState({
      id,
      ...itemData,
    });
  }

  handleCancelClick(data) {
    const { id } = data;
    const itemData = this.getItemData(data);
    this.updateDataState({
      id,
      ...itemData,
    });
  }

  handleFieldChange(data, key, value) {
    this.updateDataState({
      ...data,
      [Table.editTempKey]: {
        ...data[Table.editTempKey],
        [key]: value,
      },
    });
  }

  render() {
    const { config, data } = this.state;
    return (
      <React.Fragment>
        <h1>dailydrinks-assignment</h1>
        <button type="button">Add order</button>
        <h2>Orders:</h2>
        <Table config={config} data={data} onFieldChange={this.handleFieldChange} />
      </React.Fragment>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
