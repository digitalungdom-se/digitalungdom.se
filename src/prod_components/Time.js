import React from 'react'
import { epochToRelativeTime } from 'utils/time'

function Time({ time }) {
	const relativeTime = epochToRelativeTime(time)

	// If the relativeTime is greater than one, add a "er" or "ar" to indicate multiple days, hours, etc.
	let plural = ["", "e", ""]
	if(relativeTime[1] > 1){
		plural[0] = "er"
		plural[1] = "ar"
		plural[2] = "ar"
	}

	const display = (relativeTime) => {
		switch(relativeTime[0]) {
			case 'seconds':
				return Math.round(relativeTime[1]) + " sekund" + plural[0] + " sedan"
			case 'minutes':
				return relativeTime[1] + " minut" + plural[0] + " sedan"
			case 'hours':
				return relativeTime[1] + " timm" + plural[1] + " sedan"
			case 'days':
				return relativeTime[1] + " dag" + plural[2] + " sedan"
			default:
				return relativeTime[1].toLocaleDateString()
		}
	}
	return (
		 <span>{display(relativeTime)}</span>
	)
}

export default Time
