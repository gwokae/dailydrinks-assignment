import React from 'react';
import ReactDOM from 'react-dom';

import Table from './table/Table';
import './styles.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      config: {},
    };
  }

  render() {
    const { config, data } = this.state;
    return (
      <React.Fragment>
        <h1>dailydrinks-assignment</h1>
        <Table config={config} data={data} />
      </React.Fragment>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
