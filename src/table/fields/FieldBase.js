import React from 'react';
// import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class FieldBase extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: '',
  };

  render() {
    const { value, name, onChange } = this.props;
    return (<input type="text" value={value} name={name} onChange={onChange} />);
  }
}

export default FieldBase;
