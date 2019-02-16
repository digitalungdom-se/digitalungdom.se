import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import BlogPosts from './BlogPosts.js'
import CreateBlogPost from './CreateBlogPost.js'

class Blog extends Component {

	render() {
		return (
			<Switch>
				<Route exact path="/" component={BlogPosts}/>
				<Route path="/blog/skapa-inlagg" component={CreateBlogPost}/>
			</Switch>
		)
	}
}

export default Blog
