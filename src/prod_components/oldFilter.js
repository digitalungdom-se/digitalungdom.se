import React from 'react'
// import { timeToHex } from 'utils'
import { Card, Row, Col, Radio, DatePicker, Select } from 'antd'
import { timeToHex } from 'utils/time'
import locale from 'antd/lib/date-picker/locale/sv_SE';
import moment from 'moment'

class Filter extends React.Component {

	render() {

		const { translations } = this.props
		const { sort, date } = this.props.defaultValue
		let { after, before } = date

		return (
			<Card>
				<Row
					type="flex"
				>
					<Col>
						<Radio.Group
							defaultValue={sort}
							onChange={(e) => this.props.onChange({sort: e.target.value, date})}
							buttonStyle="solid"
						>
							<Radio.Button value="new">{translations["New"]}</Radio.Button>
							<Radio.Button value="top">{translations["Top"]}</Radio.Button>
						</Radio.Group>
					</Col>
					<Col
						offset={1}
						xs={{span: 16}}
						sm={{span: 16}}
					>
						<Select
							defaultValue="0" buttonStyle="solid"
							onChange={(value) => {
								let thing = moment().subtract(value, 'd').format('YYYY-MM-DD')
								if(value == 0) thing = moment(0).format('YYYY-MM-DD');
								console.log(value, thing, moment(0).format('YYYY-MM-DD'))
								after = {
									...timeToHex(thing),
									chosen: true
								}
								this.props.onChange({ sort, date: { after, before }})
							}}
							dropdownMatchSelectWidth={false}
						>
			        <Select.Option value="1">Senaste dygnet</Select.Option>
			        <Select.Option value="7">Senaste veckan</Select.Option>
			        <Select.Option value="31">Senaste månaden</Select.Option>
			        <Select.Option value="365">Senaste året</Select.Option>
			        <Select.Option value="0">Sedan begynnelsen</Select.Option>
			      </Select>
						
					</Col>
				</Row>
			</Card>
		)
	}
}

export default Filter
