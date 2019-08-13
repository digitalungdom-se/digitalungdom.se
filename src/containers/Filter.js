import React from 'react'
import Filter from '@components/filter'
import { useDispatch, useSelector } from 'react-redux'
import { filterAgora } from 'actions/agora'

function FilterContainer() {
	const dispatch = useDispatch()
	const updateAgoraFilter = (filter) => {
		dispatch(filterAgora(filter));
		console.log(filter)
	}
	const { time, sort } = useSelector(state => state.Agora.filter)

	return (
		 <Filter
			 	updateFilter={updateAgoraFilter}
			 	time={time}
			 	sort={sort}
		 />
	)
}

export default FilterContainer
