import React from 'react'
import { Switch, Route } from 'react-router-dom'
import BlogPosts from './BlogPosts.js'
import CreateBlogPost from './CreateBlogPost.js'

const Blog = ({ match }) => (
	<Switch>
		<Route exact path="/blog" component={BlogPosts}/>
		<Route path="/blog/skapa-inlagg" component={CreateBlogPost}/>
	</Switch>
)

export default Blog
