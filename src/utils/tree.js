export const flatTree = comments => {
	const tree = {}
	comments.forEach(comment => tree[comment._id] = comment)
	return tree
}

export const buildTree = (node, tree) => {
	return {
		comments: tree[node].children.map(child => buildTree(child, tree)),
		...tree[node]
	}
}
