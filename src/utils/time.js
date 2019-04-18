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
