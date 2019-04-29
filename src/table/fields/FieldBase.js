import React from 'react';
// import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class FieldBase extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: '',
  };

  render() {
    const { value, onChange } = this.props;
    return (<input type="text" value={value} onChange={onChange} />);
  }
}

export default FieldBase;
