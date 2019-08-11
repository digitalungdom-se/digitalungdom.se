import React from 'react'
import { epochToRelativeTime } from 'utils/time'

function Time({ time }) {
	const relativeTime = epochToRelativeTime(time)
	const display = (relativeTime) => {
		switch(relativeTime[0]) {
			case 'seconds':
				return relativeTime[1] + " sekunder sedan"
			case 'minutes':
				return relativeTime[1] + " minuter sedan"
			case 'hours':
				return relativeTime[1] + " timmar sedan"
			case 'date':
				return relativeTime[1].toLocaleDateString()
		}
	}
	return (
		 <span>{display(relativeTime)}</span>
	)
}

export default Time
