import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Agora as actions } from 'actions'
import { getAgoragrams } from 'actions/agora'
// import { Filter } from '@components'
import Filter from '@components/Filter'
// import { Posts } from 'containers'
import Posts from 'containers/posts'
// import { timeToHex } from 'utils'
import { timeToHex } from 'utils/time'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

const mapStateToProps = (state, props) => {
	return ({
		list: state.Agora.posts.routes[state.Agora.query]
	})
}

const mapDispatchToProps = (dispatch) => ({
	get_agoragrams: (filter) => dispatch(getAgoragrams(filter)),
})

class FilterAndPosts extends Component {

	constructor(props) {
		super(props)

		const { time, sort, route } = this.props.filter
		const hypagora = this.props.hypagora

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
			hypagora: hypagora ? hypagora : "general",
			route,
			redirect: route
		}
	}

	componentWillMount() {

		this.fetchPosts(this.state)
	}

	filterChange(filter) {

		let { after, before } = filter.date
		let { sort } = filter
		const { time } = this.props

		const hypagora = this.props.hypagora ? this.props.hypagora : this.state.hypagora

		let route = "/agora"
		if(hypagora) {
			route += "/h/" + hypagora
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
		this.setState({ sort, date: {after, before}, hypagora})
		if(this.props.route !== route) this.props.history.push(route);
		this.fetchPosts({ sort, date: {after, before}, hypagora})
	}

	fetchPosts(filter) {
		this.props.get_agoragrams({
			dateAfter: filter.date.after.hex,
			dateBefore: filter.date.before.hex,
			sort: filter.sort,
			hypagora: filter.hypagora
		})
		// .then(res => {
		// 	console.log(res)
		// 	if(res) {
		// 		return this.setState({_url: res._url})
		// 	}
		// })
	}
	
	render() {

		const { t } = this.props

		return (
			<React.Fragment>
				<Filter
					onChange={(field, value) => this.filterChange(field, value)}
					defaultValue={this.state}
					translations={{
						"New": t("New"),
						"Top": t("Top")
					}}
				/>
				<Posts
					list={this.props.list}
				/>
			</React.Fragment>
		)
	}
}

export default withTranslation()(
	withRouter(connect(mapStateToProps, mapDispatchToProps)(FilterAndPosts))
)
