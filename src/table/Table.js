import React from 'react';
// import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Table extends React.Component {
  static propsType = {
    config: PropTypes.objectOf(() => (true)).isRequired,
    data: PropTypes.arrayOf(() => (true)).isRequired,
  }

  render() {
    return (<h1>hello</h1>);
  }
}

export default Table;
