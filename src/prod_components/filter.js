import React from 'react'
import { Row, Col, Select } from 'antd'
import { timeToHex } from 'utils/time'

function Filter({ updateFilter, time = 31, sort = "new" }) {

	return (
		<div style={{background: "white", padding: "8px 0"}}>
	 		<Row type="flex" justify="center">
				<Col
				xs={{ span: 22 }}
				sm={{ span: 22 }}
				md={{ span: 20 }}
				lg={{ span: 18 }}
				xl={{ span: 16 }}>

				<Row type="flex" justify="start">
		 			<Col
		 				style={{marginRight: 16}}
		 			>
		 				<span
		 					style={{marginRight: 16}}
		 				>
		 					Sortera efter
		 				</span>
		 				<Select
							defaultValue={sort}
		 					onChange={sort => updateFilter({ sort })}
							style={{border: "0"}}
		 				>
			 				<Select.Option value="new">nya</Select.Option>
			 				<Select.Option value="top">topp</Select.Option>
		 				</Select>
		 			</Col>

		 			<Col>
		 				<Select
		 					defaultValue={time.toString()}
		 					onChange={(stringValue) => {
		 						const value = {
		 							day: 1,
		 							week: 7,
		 							month: 30,
		 							year: 365,
		 							ever: 0
		 						}[stringValue]
		 						let date = (new Date(Date.now() - value*1000*3600*24))
								let string = date.toISOString().substring(0, 10)
								if(value === 0) string = (new Date(0)).toISOString().substring(0, 10)
		 						updateFilter({
		 							dateAfter: timeToHex(string).hex,
		 							dateBefore: timeToHex(Date.now()).hex,
		 							time: stringValue
		 						})
		 					}}
		 					dropdownMatchSelectWidth={false}
		 				>
		 	        <Select.Option value="day">senaste dygnet</Select.Option>
		 	        <Select.Option value="week">senaste veckan</Select.Option>
		 	        <Select.Option value="month">senaste månaden</Select.Option>
		 	        <Select.Option value="year">senaste året</Select.Option>
		 	        <Select.Option value="ever">sedan begynnelsen</Select.Option>
		 	      </Select>
		 			</Col>
				</Row>
				</Col>

			</Row>
		</div>
	)
}

export default Filter
