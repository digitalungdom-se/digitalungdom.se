const pad = (s, c, l) => (s + '').length < l ? (new Array(l + 1 - (s + '').length).join(c)) + s : s

export const timeToHex = (time) => {
	let date = time
	let string
	if(typeof time === 'string') {
		string = time
		if(date.split('-').length < 4) date = new Date(date);
		else {
			date = time.split('-')
			if(date.length === 4) date = new Date(date[0], parseInt(date[1]) - 1, date[2], date[3]);
			else date = new Date(date[0], parseInt(date[1]) - 1, date[2], date[3], date[4]);
		}
	} else date = new Date(time)
	if(string === undefined) {
		string = date.getUTCFullYear() + '-' + pad((date.getUTCMonth() + 1), '0', 2) + '-' + pad((date.getUTCDate()), '0', 2)
		let x = ''
		if(date.getUTCHours() !== 0) x = '-' + pad((date.getUTCHours() + 1), '0', 2);
		if(date.getUTCMinutes() !== 0) x = '-' + pad((date.getUTCHours() + 1), '0', 2) + '-' + pad((date.getUTCMinutes() + 1), '0', 2);
		string += x
	}
	
	return {
		date,
		string,
		hex: (Math.floor(date.getTime()/1000)).toString(16)
	}
}

export const epochToRelativeTime = (time) => {
	let microseconds = parseInt(time.substring(0, 8), 16)*1000
	let now = Date.now()
	let delta = (now - microseconds)/1000
	let unit, unitDelta
	if(delta < 604800) {
		if(delta < 86400) {
			if(delta < 3600) {
				if(delta < 60) [unit, unitDelta] = ["seconds", delta];
				else [unit, unitDelta] = ["minutes", Math.floor(delta/60)]
			} else [unit, unitDelta] = ["hours", Math.floor(delta/3600)]
		} else [unit, unitDelta] = ["days", Math.floor(delta/86400)]
	} else [unit, unitDelta] = ["date", new Date(microseconds)]
	return [unit, unitDelta, new Date(microseconds)]
}
