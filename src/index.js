import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid/v4';

import Table from './table/Table';
import './styles.scss';

const initData = [
  {
    id: uuid(),
    name: 'John Doe',
    price: 123,
    notes: 'Hello World',
  },
];

const initSchema = [
  { key: 'name', type: 'text' },
  { key: 'price', type: 'number' },
  { key: 'notes', type: 'textarea' },
];

const App = () => {
  const [tableData, setTableData] = useState(initData);
  const [schema] = useState(initSchema);
  return (
    <>
      <h1>dailydrinks-assignment</h1>
      <button type="button">Add order</button>
      <h2>Orders:</h2>
      <Table
        schema={schema}
        data={tableData}
        updateData={(data) => {
          const { id } = data;
          setTableData(tableData.map((item) => {
            if (item.id === id) {
              return { ...data };
            }
            return { ...item };
          }));
        }}
      />
    </>
  );
};
ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
