import React from 'react';
import ReactDOM from 'react-dom';

import Table from './table/Table';
import './styles.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

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
          { name: 'Edit' },
          { name: 'Delete' },
        ],
      },
    };
  }

  render() {
    const { config, data } = this.state;
    return (
      <React.Fragment>
        <h1>dailydrinks-assignment</h1>
        <button type="button">Add order</button>
        <h2>Orders:</h2>
        <Table config={config} data={data} />
      </React.Fragment>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
