export const makeTitle = (title) => {
	let link = ""
	const allowedChars = "abcdefghijklmnopqrstuvwxyz_-0123456789"
	let t = title.toLowerCase()
	for (var i = 0; i < t.length; i++) {
		if(t[i] === " ") link += "_"
		else if(allowedChars.indexOf(t[i]) !== -1 ) link += t[i]
	}
	return link
}
