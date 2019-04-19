import React from 'react'
import {
	Route,
	Switch
} from 'react-router-dom'
import {
	Agorize,
	Comments,
	Posts,
	Post,
	Surrounding,
	Wiki
} from 'containers'
import { connect } from 'react-redux'

const Subreddit = ({ children, subreddit }) => (
	<div>
		Subreddit – {"/r/" + subreddit}
		{children}
		<Surrounding subreddit={subreddit} />
	</div>
)

class Inner extends React.Component {
	shouldComponentUpdate() {
		return !(this.props.fetchedSeveral)
	}
	render() {
		const { params } = this.props.match
		let time, sort, subreddit
		
		if(params.subredditOrTime && params.subredditOrTime.indexOf('=') !== -1) time = params.subredditOrTime;
		else if(params.timeOrId && params.timeOrId.indexOf('=') !== -1) time = params.timeOrId;

		if(params.rOrSort && params.rOrSort !== 'r' && params.rOrSort.indexOf('=') === -1) sort = params.rOrSort;
		else if(params.commentsOrSortOrOther !== "comments") sort = params.commentsOrSortOrOther;

		if(params.rOrSort === 'r') subreddit = params.subredditOrTime;

		if(params.rOrSort !== 'r') return (
			<div>
				<Posts history={this.props.history} route={this.props.location.pathname} time={time} sort={sort} subreddit={subreddit} />
				<Surrounding subreddit={null} />
			</div>
		)
		if(params.rOrSort === 'r') {
			if(params.commentsOrSortOrOther === "comments") {
				const id = params.timeOrId
				return (
					<Subreddit subreddit={subreddit}>
						<Post
							id={params.timeOrId}
							comments
						/>
					</Subreddit>
				)
			} else if(params.commentsOrSortOrOther === "wiki") {
				return (
					<Subreddit subreddit={subreddit}>
						<Wiki />
					</Subreddit>
				)
			} else {
				return (
					<Subreddit subreddit={subreddit}>
						<Posts history={this.props.history} route={this.props.location.pathname} time={time} sort={sort} subreddit={subreddit} />
					</Subreddit>
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
			<Route path="/agora/r/:subreddit/submit" render={(props) => (
				<div>
					<Agorize subreddit={props.match.params.subreddit}/>
					<Surrounding subreddit={props.match.params.subreddit} />
				</div>
			)} />
			<Route path="/agora/:rOrSort?/:subredditOrTime?/:commentsOrSortOrOther?/:timeOrId?" component={SubOrPos}/>
		</Switch>
		{fetchedSeveral && <Route path="/agora/r/:subreddit/comments/:id/:title" render={(props) => <Post comments id={props.match.params.id} />} />}
	</div>
))
