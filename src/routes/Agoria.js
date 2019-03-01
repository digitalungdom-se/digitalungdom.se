import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { AgoriaHome, CreateAgoriaPost} from 'components'

const Blog = ({ match }) => (
	<Switch>
		<Route exact path="/agoria" component={AgoriaHome}/>
		<Route path="/agoria/skapa-inlagg" component={CreateAgoriaPost}/>
	</Switch>
)

export default Blog
