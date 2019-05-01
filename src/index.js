import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid/v4';

import Table from './table/Table';
import 'normalize.css';
import './styles.scss';

const initData = [
  {
    id: uuid(),
    name: 'Bubble tea',
    price: 145,
    notes: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut est urna, congue vel augue in, lobortis lobortis mi. Nunc posuere, urna nec aliquet tristique, elit tortor tempus orci, ut faucibus neque felis et massa. Suspendisse at placerat velit, vitae lobortis nibh. Phasellus tempus turpis augue, non lacinia libero scelerisque a. Praesent odio erat, varius sit amet nulla a, semper sollicitudin dolor. Sed pellentesque luctus dui, nec facilisis libero placerat ut. Vivamus ultrices finibus eleifend. Sed porta id justo in eleifend. Nunc nec tempor risus. Vestibulum ac posuere quam. Sed ornare accumsan metus vitae mollis.

Morbi ut sem sagittis, pretium leo et, egestas urna. Cras cursus tellus id dolor convallis sollicitudin. Sed ligula dui, vulputate sit amet ultricies vitae, volutpat sit amet odio. Cras porttitor rhoncus odio eu fermentum. Aenean leo nunc, aliquam ac lobortis iaculis, rutrum sed leo. Nunc sem elit, mollis sit amet ante quis, viverra faucibus enim. In a ligula velit. Nulla eget ultrices arcu. Nam hendrerit, lacus pretium vestibulum volutpat, mi ligula pulvinar lacus, et ultricies arcu urna at odio. Nam turpis tortor, molestie eget mollis a, malesuada eget nisi. Integer id interdum tortor, sit amet eleifend lectus. Nulla at lacinia velit, gravida aliquam sem.

Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc non risus facilisis ipsum imperdiet mattis. Duis scelerisque tortor quam, non sollicitudin dui iaculis eget. Nulla sed aliquam sem. Nulla facilisi. Phasellus eu mi aliquam, tristique libero in, elementum dolor. Nunc quis diam vel nunc egestas blandit quis sed augue. In fringilla imperdiet justo, in lobortis purus viverra ut. Nullam ut orci arcu.

Curabitur at elementum purus. Integer quis venenatis sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse lorem purus, auctor at turpis ac, laoreet pellentesque purus. Fusce dignissim, elit vitae rhoncus volutpat, ante urna posuere nulla, et aliquam eros nibh facilisis tortor. Suspendisse porttitor dapibus lacus id hendrerit. Maecenas orci justo, faucibus mattis quam vitae, luctus molestie erat. Vestibulum bibendum pulvinar quam nec hendrerit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque id justo vitae diam viverra elementum in eget mauris.
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
      <div className="table-buttons">
        <button
          type="button"
          disabled={isAddingItem}
          onClick={() => setIsAddingItem(true)}
          data-icon="➕"
        >
          Add order
        </button>
      </div>
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
      <footer>
        Author:
        <a href="mailto:gwokae@gmail.com">Leonard Lin</a>
      </footer>
    </>
  );
};
ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
