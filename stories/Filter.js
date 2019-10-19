import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

// import Filter from '@components/filter'
import { Row, Col, Button, Select } from 'antd'

const Option = Select.Option

function Filter({ handleTime, handleSort, sort, time }) {
	return (
		<div
		>
			<span
				style={{
					padding: "0 8px"
				}}
			>
				Sortera efter
			</span>
 			<span
	 			style={{
					padding: "0 8px"
				}}
 			>
				<Select
					value={sort}
					dropdownMatchSelectWidth={false}
					onChange={handleSort}
				>
		      <Option value="top">topp</Option>
		      <Option value="new">nya</Option>
		    </Select>
	    </span>
	    <span
	    	style={{
					padding: "0 8px"
				}}
	    >
				<Select
					value={time}
					dropdownMatchSelectWidth={false}
					onChange={handleTime}
				>
		      <Option value="hour">senaste timman</Option>
		      <Option value="day">senaste dagen</Option>
		      <Option value="week">senaste veckan</Option>
		      <Option value="month">senaste månaden</Option>
		      <Option value="year">senaste året</Option>
		    </Select>
	    </span>
		</div>
	)
}

storiesOf('Filter', module)
	.add("Filter", () => React.createElement(() => {

		const [sort, selectSort] = useState("new")
		const [time, selectTime] = useState("week")

		const handleSort = (value) => {
			selectSort(value)
			action('chosen')(value)
		}

		const handleTime = (value) => {
			selectTime(value)
			action('chosen')(value)
		}

		const edges = {
			0: [
				"hello"
			],
			1: [
			"test",
			"hellooo!!1"
			]
		}

		const [chosenEdge, chooseEdge] = useState(0)

		const posts = edges[chosenEdge].map(i => <li>{i}</li>)

		return (
			<div>
				<Filter
					handleTime={handleTime}
					handleSort={handleSort}
					sort={sort}
					time={time}
				/>
				{
					posts
				}
				<Button onClick={() => {
					chooseEdge(1)
				}}>
					Ladda mer!
				</Button>
			</div>
		)

	}))
  // .add('Filter', () => (
  //   <Filter />
  // ))
