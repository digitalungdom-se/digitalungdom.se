import React, { Component } from 'react'
import { Input, Select } from 'antd'

const Option = Select.Option
const InputGroup = Input.Group

class Birthday extends Component {
	render() {
		let years = []
		for(let i = 2018; i > 1900; i--) years.push(i);
		let yearOptions = years.map(year => <Option value={year}>{year}</Option>)
		let days = []
		return (
			<InputGroup compact>
				<Select
					showSearch
					placeholder="År"
					style={{width: '30%'}}
				>
		      {yearOptions}
		    </Select>
	  		<Select
	  			placeholder="Månad"
	  			showSearch
	  			style={{width: '40%'}}
	  		>
	        <Option value="1">Januari</Option>
	        <Option value="2">Februari</Option>
	        <Option value="3">Mars</Option>
	        <Option value="4">April</Option>
	        <Option value="5">Maj</Option>
	        <Option value="6">Juni</Option>
	        <Option value="7">Juli</Option>
	        <Option value="8">Augusti</Option>
	        <Option value="9">September</Option>
	        <Option value="10">Oktober</Option>
	        <Option value="11">November</Option>
	        <Option value="12">December</Option>
	      </Select>
	      <Select
	      	style={{width: '30%'}}
	      >
	      </Select>
	    </InputGroup>
		)
	}
}

export default Birthday
