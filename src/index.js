import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid/v4';

import Table from './table/Table';
import './styles.scss';

const initData = [
  {
    id: uuid(),
    name: 'Bubble tea',
    price: 145,
    notes: `test

    multi lines
`
    ,
  },
  {
    id: uuid(),
    name: 'Apple juice',
    price: 50,
  },
  {
    id: uuid(),
    name: 'Coffee',
    price: 80,
  },
];

const initSchema = [
  {
    key: 'name',
    label: 'Name',
    type: 'text',
    sortable: true,
  },
  {
    key: 'price',
    label: 'Price',
    type: 'number',
    sortable: true,
    min: 0,
    step: 1,
  },
  {
    key: 'notes',
    label: 'Notes',
    type: 'textarea',
    optional: true,
    rows: 2,
  },
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
