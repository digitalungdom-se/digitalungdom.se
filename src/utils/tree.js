export const flatTree = comments => {
	const tree = {}, users = []
	comments.forEach(comment => {
		tree[comment._id] = comment
		if(comment.author && users.indexOf(comment.author) === -1) users.push(comment.author)
	})
	return {tree, users}
}

export const buildTree = (node, tree) => {
	// const recursive = node => {
	// 	comments: tree[node].children
	// 	// return {
	// 	// 	node
	// 	// 	newTree[node]
	// 	// }
	// }
	// const recursive = (node, tree) => {
	// 	comments: tree[node].children.map(child => buildTree(child, tree)),
	// 	...tree[node]	
	// }
	return {
		comments: tree[node].children.map(child => buildTree(child, tree)),
		// ...tree[node]
		_id: tree[node]._id
	}
}
