import React from 'react'
import { AutoComplete, Input, Icon } from 'antd'

function onSelect(value) {
  console.log('onSelect', value);
}

class Complete extends React.Component {
  state = {
    dataSource: [],
  };

  handleSearch = value => {
    this.setState({
      dataSource: !value ? [] : [value, value + value, value + value + value],
    });
  };

  render() {
    const { dataSource } = this.state;
    return (
      <AutoComplete
        dataSource={dataSource}
        style={{ width: "100%"}}
        onSelect={onSelect}
        onSearch={this.handleSearch}
        placeholder="Search"
      >
      	<Input
          suffix={<Icon type="search"/>}
        />
      </AutoComplete>
    )
  }
}

export default Complete
