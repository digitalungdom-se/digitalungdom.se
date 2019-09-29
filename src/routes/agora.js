import React from 'react'
import {
	Route,
	Switch
} from 'react-router-dom'
import Hypagora from 'containers/hypagora'
import Surrounding from 'containers/surrounding'
import Agorize from 'containers/agorize'
import Overlay from 'containers/Overlay'
// import {
// 	Hypagora,
// 	Post,
// 	Surrounding,
// 	CreateHypagora,
// } from 'containers'
import { connect } from 'react-redux'
import 'resources/agora.css'
import { Row, Col } from '@components/grid'

class Inner extends React.Component {
	// shouldComponentUpdate() {
	// 	return !(this.props.fetchedSeveral)
	// }
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
						id={filter.id}
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
	<div
		className="agora"
	>
		<Switch>
			<Route path="/agora/h/:hypagora/(publicera|submit)" render={(props) => (
				<Surrounding hypagora={props.match.params.hypagora} >
					<Agorize
						hypagora={props.match.params.hypagora}
						agoragramType="post"
						onAgorized={(redirect) => props.history.push('/agora/' + '/h/' + redirect.hypagora + '/comments/' + redirect.shortID + 'title')}
					/>
				</Surrounding>
			)} />
			<Route path="/agora/:hOrSort?/:hypagoraOrTime?/:commentsOrSortOrOther?/:timeOrId?" render={props => (
				<Surrounding
					hypagora={props.match.params.hypagoraOrTime}
					noSurrounding={["comments", "kommentarer"].indexOf(props.match.params.commentsOrSortOrOther) !== -1}
				>
					<SubOrPos
						{...props}
					/>
				</Surrounding>
			)}/>
		</Switch>
	</div>
))

/*
{fetchedSeveral &&
	<Route
		path="/agora/h/:hypagora/(kommentarer|comments)/:id/:title"
		render={(props) =>
			<Row
			>
				<Col
					span={20}
				>
					<Overlay id={props.match.params.id}/>
				</Col>
			</Row>
		}
		/>
}
*/
