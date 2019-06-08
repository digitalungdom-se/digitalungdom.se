import React from 'react'
import {
	Route,
	Switch
} from 'react-router-dom'
import {
	Hypagora,
	Post,
	Surrounding,
} from 'containers'
import { connect } from 'react-redux'

class Inner extends React.Component {
	shouldComponentUpdate() {
		return !(this.props.fetchedSeveral)
	}
	render() {
		const { params } = this.props.match
		let time, sort, hypagora
		
		if(params.hypagoraOrTime && params.hypagoraOrTime.indexOf('=') !== -1) time = params.hypagoraOrTime;
		else if(params.timeOrId && params.timeOrId.indexOf('=') !== -1) time = params.timeOrId;

		if(params.hOrSort && params.hOrSort !== 'h' && params.hOrSort.indexOf('=') === -1) sort = params.hOrSort;
		else if(params.commentsOrSortOrOther !== "comments") sort = params.commentsOrSortOrOther;

		if(params.hOrSort === 'h') hypagora = params.hypagoraOrTime;
		const filter = {
			route: this.props.location.pathname,
			id: params.timeOrId,
			time,
			sort,
			hypagora,
		}

		if(params.hOrSort !== 'h') return (
			<Hypagora
				route="h"
				hypagora={hypagora}
				filter={filter}
			/>
		)
		if(params.hOrSort === 'h') {
			if(params.commentsOrSortOrOther === "kommentarer" || params.commentsOrSortOrOther === "comments") {
				return (
					<Hypagora
						route="comments"
						hypagora={hypagora}
						filter={filter}
					/>
				)
			} else if(params.commentsOrSortOrOther === "wiki") {
				return (
					<Hypagora
						route="wiki"
						hypagora={hypagora}
					/>
				)
			} else {
				return (
					<Hypagora
						hypagora={hypagora}
						filter={filter}
					/>
				)
			}
		}
		return <div />
	}
}

const mapStateToProps = state => ({
	fetchedSeveral: state.Agora.posts.fetchedSeveral
})

const SubOrPos = connect(mapStateToProps)(Inner)

export default connect(mapStateToProps)(({ fetchedSeveral }) => (
	<div>
		<Switch>
			<Route path="/agora/(skapa_hypagora|create_hypagora)" render={(props) => (
				<div>
					<Surrounding route="create_hypagora" />
				</div>
				)}
			/>
			<Route path="/agora/h/:hypagora/(publicera|submit)" render={(props) => (
				<div>
					<Surrounding hypagora={props.match.params.hypagora} />
				</div>
			)} />
			<Route path="/agora/:hOrSort?/:hypagoraOrTime?/:commentsOrSortOrOther?/:timeOrId?" component={SubOrPos}/>
		</Switch>
		{fetchedSeveral && <Route path="/agora/h/:hypagora/(kommentarer|comments)/:id/:title" render={(props) => <Post comments id={props.match.params.id} />} />}
	</div>
))
