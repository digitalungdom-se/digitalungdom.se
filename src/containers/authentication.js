import React, { useState } from 'react'
// import actions from 'actions/auth'
import { useDispatch, useSelector } from 'react-redux'
import { withTranslation } from 'react-i18next'
// import {
// 	Link,
// 	ProfileBox
// } from '@components'
import Link from '@components/link'
import ProfileBox from '@components/profilebox'
import { Row, Col } from '@components/grid'
import { Menu } from "antd"
import { auth, logout } from 'actions/auth'

// const mapStateToProps = (state) => ({
// 	profile: state.Auth.profile
// })

// const mapDispatchToProps = (dispatch) => ({
// 	auth: (details, fakeResponse) => dispatch(auth(details, fakeResponse)),
// 	logout: () => dispatch(logout())
// })

function Authentication({ t, type, setDropdownVisible }) {

	const [hasDispatched, dispatched] = useState(false)
	const dispatch = useDispatch()
	if(!hasDispatched) {
		dispatched(true)
		dispatch(auth())
	}

	const authorized = useSelector(state => state.Auth.authorized)
	const authorizing = useSelector(state => state.Auth.authorizing)
	const profile = useSelector(state => state.Auth.profile)

	if(authorized) {
		return (
			<ProfileBox
				authorizing={authorizing}
				profile={profile}
				logout={() => dispatch(logout())}
				translations={{
					"Log out": t("Log out")
				}}
			/>
		)
	}else{

		if(type==="dropdown"){
			return (
				<ul style={{textAlign: 'center', padding: 0, paddingBottom: 4}}>

					<li style={{ listStyleType: "none", margin: "10px 0px"}}>
						<Link
							linkType="navigation"
							to={"/" + t("links-login")}
							onClick={()=> setDropdownVisible(false)}
						>
							{t("Log in")}
						</Link>
			    </li>

					<li  style={{ listStyleType: "none", margin: "10px 0px"}}>
						<Link
							linkType="navigation"
							to={"/" + t("links-register")}
							type="primary"
							style={{fontWeight: "bold", color: "rgb(30,110,232)"}}
							onClick={()=> setDropdownVisible(false)}
						>
							{t("Register")}
						</Link>
					</li>
				</ul>
			)
		}else{
			return(
				<Row
					type="flex"
					justify="end"
					gutter={{
						xs: 10,
						sm: 20,
						md: 40,
					}}
				>
					<Col>
						<Link
							linkType="navigation"
							to={"/" + t("links-login")}
						>
							{t("Log in")}
						</Link>
					</Col>

					<Col>
						<Link
							linkType="navigation"
							to={"/" + t("links-register")}
							type="primary"
							style={{fontWeight: "bold", color: "rgb(30,110,232)"}}
						>
							{t("Register")}
						</Link>
					</Col>
				</Row>
			)
		}
	}
}

export default withTranslation()(Authentication)
