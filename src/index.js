import React from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid/v4';

import Table from './table/Table';
import './styles.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          id: uuid(),
          name: 'John Doe',
          price: 123,
          notes: 'Hello World',
        },
      ],
      schema: [
        { key: 'name', type: 'text' },
        { key: 'price', type: 'number' },
        { key: 'notes', type: 'textarea' },
      ],
    };

    this.handleUpdateData = this.handleUpdateData.bind(this);
  }

  getItemData(item) {
    const { config } = this.state;
    return config.fields
      .reduce((result, { key }) => Object.assign(result, { [key]: item[key] }), {});
  }

  handleUpdateData(data) {
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

  render() {
    const { schema, data } = this.state;
    return (
      <React.Fragment>
        <h1>dailydrinks-assignment</h1>
        <button type="button">Add order</button>
        <h2>Orders:</h2>
        <Table schema={schema} data={data} updateData={this.handleUpdateData} />
      </React.Fragment>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
