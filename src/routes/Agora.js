import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Agora } from 'components'

const AgoraRoute = ({ match }) => (
	<Switch>
		<Route exact path="/agora" component={Agora.Home}/>
		<Route path="/agora/inlagg/:post" component={Agora.PostPage}/>
		<Route path="/agora/skapa-inlagg" component={Agora.CreatePost}/>
	</Switch>
)

// const AgoraRoute = ({ match }) => (
// 	<Switch>
// 		<Route path="/agora/:type" component={Agora.Home}/>
// 		<Route path="/agora" component={Agora.Home}/>
// 	</Switch>
// )

export default AgoraRoute
