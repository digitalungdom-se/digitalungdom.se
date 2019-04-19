import React from 'react'
import {
	Route,
	Switch
} from 'react-router-dom'
import {
	Agorize,
	Posts,
	Post,
	Surrounding,
	Wiki
} from 'containers'
import { connect } from 'react-redux'

const Hypagora = ({ children, hypagora }) => (
	<div>
		<Surrounding hypagora={hypagora} />
		Hypagora – {"/h/" + hypagora}
		{children}
	</div>
)

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

		if(params.hOrSort !== 'h') return (
			<div>
				<Surrounding hypagora={"general"} />
				<Posts history={this.props.history} route={this.props.location.pathname} time={time} sort={sort} hypagora={hypagora} />
			</div>
		)
		if(params.hOrSort === 'h') {
			if(params.commentsOrSortOrOther === "comments") {
				return (
					<Hypagora hypagora={hypagora}>
						<Post
							id={params.timeOrId}
							comments
						/>
					</Hypagora>
				)
			} else if(params.commentsOrSortOrOther === "wiki") {
				return (
					<Hypagora hypagora={hypagora}>
						<Wiki />
					</Hypagora>
				)
			} else {
				return (
					<Hypagora hypagora={hypagora}>
						<Posts history={this.props.history} route={this.props.location.pathname} time={time} sort={sort} hypagora={hypagora} />
					</Hypagora>
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
			<Route path="/agora/h/:hypagora/submit" render={(props) => (
				<div>
					<Surrounding hypagora={props.match.params.hypagora} />
					<Agorize hypagora={props.match.params.hypagora}/>
				</div>
			)} />
			<Route path="/agora/:hOrSort?/:hypagoraOrTime?/:commentsOrSortOrOther?/:timeOrId?" component={SubOrPos}/>
		</Switch>
		{fetchedSeveral && <Route path="/agora/h/:hypagora/comments/:id/:title" render={(props) => <Post comments id={props.match.params.id} />} />}
	</div>
))
