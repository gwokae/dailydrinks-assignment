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
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'price', label: 'Price', type: 'number' },
  { key: 'notes', label: 'Notes', type: 'textarea' },
];

const App = () => {
  const [tableData, setTableData] = useState(initData);
  const [schema] = useState(initSchema);
  const [isAddingItem, setIsAddingItem] = useState(false);
  return (
    <>
      <h1>dailydrinks-assignment</h1>
      <h2>Orders:</h2>
      <button
        type="button"
        disabled={isAddingItem}
        onClick={() => setIsAddingItem(true)}
      >
        Add order
      </button>
      <Table
        schema={schema}
        data={tableData}
        deleteItem={id => setTableData(tableData.filter(item => item.id !== id))}
        updateItem={(data) => {
          const { id } = data;
          setTableData(tableData.map((item) => {
            if (item.id === id) {
              return { ...data };
            }
            return { ...item };
          }));
        }}
        isAddingItem={isAddingItem}
        addItem={(item) => {
          setIsAddingItem(false);
          if (item) setTableData([{ ...item, id: uuid() }, ...tableData]);
        }}
      />
    </>
  );
};
ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
