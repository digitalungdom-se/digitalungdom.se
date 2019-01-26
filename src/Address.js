import React, { Component } from 'react'
import { Input, InputNumber, InputGroup } from 'antd'

class Address extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {
      address: value.address || null,
      postnummer: value.postnummer || null,
      postort: value.postort || null,
    };
  }

  handleChange = (e, field) => {
    if(e) {
      let v
      if (isNaN(e) === true ) v = {[field] : e.target.value}
      else v = {[field] : e};
      this.setState(v)
      this.triggerChange(v)
    }
  }

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  }

  render() {
    const { size } = this.props;
    const state = this.state;
    return (
      <div>
        <Input.Group compact style={{width: '100%'}}>
          <Input
            type="text"
            placeholder="Gatuaddress"
            // value={state.address}
            onChange={(e) => this.handleChange(e, 'address') }
            style={{ width: '50%' }}
          />
          <Input
            type="text"
            placeholder="c/o"
            onChange={(e) => this.handleChange(e, 'address') }
            style={{ width: '50%' }}
          />
        </Input.Group>
        <Input.Group compact>
          <Input
            type="text"
            placeholder="Postort"
            // value={state.postnummer}
            onChange={(e) => this.handleChange(e, 'postort') }
            style={{ width: '50%' }}
          />
          <InputNumber
            // value={state.postort}
            placeholder="Postnummer"
            onChange={(e) => this.handleChange(e, 'postnummer') }
            style={{ width: '50%' }}
          />
        </Input.Group>
      </div>
    );
  }
}

export default Address
