import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Agora as actions } from 'actions'
import { Filter, Post } from '@components'
import { timeToHex } from 'utils'
import { Redirect } from 'react-router-dom'

const mapStateToProps = (state) => ({
	state: state.Agora
})

const mapDispatchToProps = (dispatch) => ({
	get_agoragrams: (gram, fakeResponse) => dispatch(actions.get_agoragrams(gram, fakeResponse)),
})

class Posts extends Component {

	constructor(props) {
		super(props)

		const { time, sort } = this.props

		const regex = (c) => new RegExp(c + "=([0-9, -]*)", 'g')

		let after, before

		if(time) {
			after = time.match(regex("a"))
			before = time.match(regex("b"))
		}

		after = after ? after[0].substr(2) : 0
		before = before ? before[0].substr(2) : Date.now()

		this.state = {
			sort: sort ? sort : "new",
			date: {
				after: timeToHex(after),
				before: timeToHex(before)
			},
			_url: "",
			group: this.props.subreddit ? this.props.subreddit : "all",
			route: this.props.route ? this.props.route : this.props.location.pathname,
			redirect: this.props.route ? this.props.route : this.props.location.pathname
		}
	}

	// shouldComponentUpdate() {
	// 	// const { time, sort } = this.props

	// 	// const regex = (c) => new RegExp(c + "=([0-9, -]*)", 'g')

	// 	// let after, before

	// 	// if(time) {
	// 	// 	after = time.match(regex("a"))
	// 	// 	before = time.match(regex("b"))
	// 	// }

	// 	// after = after ? after[0].substr(2) : 0
	// 	// before = before ? before[0].substr(2) : Date.now()

	// 	// this.setState({
	// 	// 	sort: sort ? sort : "new",
	// 	// 	date: {
	// 	// 		after: timeToHex(after),
	// 	// 		before: timeToHex(before)
	// 	// 	},
	// 	// 	route: this.props.route ? this.props.route : this.props.location.pathname,
	// 	// 	redirect: this.props.route ? this.props.route : this.props.location.pathname
	// 	// })
	// 	// console.log('ajshdasjhdjskhjsh')
	// 	// return false
	// 	// return true
	// }

	componentWillMount() {

		this.fetchPosts(this.state)
	}

	filterChange(filter) {

		let { after, before } = filter.date
		let { sort } = filter
		const { time } = this.props

		const subreddit = this.props.subreddit

		let route = "/agora"
		if(subreddit) {
			route += "/r/" + subreddit
		}
		route += '/' + filter.sort

		if(filter.date !== this.state.date) {
			if((after.chosen && before.chosen) || (after.hex !== this.state.date.after.hex && before.hex !== this.state.date.before.hex)) {
				route += "/a=" + after.string + "b=" + before.string
			} else if(after.hex !== this.state.date.after.hex) {
				if(after.chosen && time && time[0] === 'b') route += "/a=" + after.string + time;
				else route += "/a=" + after.string;
			} else if(before !== this.state.date.before.hex) {
				if(before.chosen && time && time.indexOf("b=") !== -1 && time.indexOf("a=") !== -1) route += "/a=" + after.string + "b=" + before.string;
				else route += "/b=" + before.string
			} else if(time) {
				route += "/" + time
			}
		}
		this.setState({ sort, date: {after, before}, group: subreddit})
		// this.setState({ sort, date: { after, before }, redirect: route })
		if(this.props.route !== route) this.props.history.push(route);
		this.fetchPosts({ sort, date: {after, before}, group: subreddit})
		// console.log(this.props.history.push())
	}

	fetchPosts(filter) {
		const response = this.props.get_agoragrams({
			dateAfter: filter.date.after.hex,
			dateBefore: filter.date.before.hex,
			sort: filter.sort,
			group: filter.group
		})
		.then(({_url}) => {
			return this.setState({_url})
		})
		// let _url = response.result
		// return this.setState({
		// 	_url: response
		// })
	}

	render() {
		// console.log(this.state.redirect, this.state.route)
		// console.log(this.props.route)
		// console.log('render posts')

		const loading = ([0,0,0,0,0,0,0,0,0,0]).map((a, index) => <Post key={index} loading />)
		const posts = !this.props.state.posts[this.state._url] ? null : this.props.state.posts[this.state._url].map(id => (
			<Post
				id={id}
				key={id}
			/>
		))
		// const posts = this.state._url ? null : this.props.state.posts[this.state._url.result._url].map((id, index) => (
		// 	<Post
		// 		key={index}
		// 		post={post}
		// 	/>
		// ))

		return (
			<div>
				<Filter
					onChange={(field, value) => this.filterChange(field, value)}
					defaultValue={this.state}
				/>
				<div>
				{this.props.state.fetchingAgoragrams && loading}
				{posts}
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
