import React, {useState} from 'react'
import Link from '@components/link'
import Star from '@components/star'
import Actions from 'containers/actions'
import './comment.css'
import { Divider, Row, Col, Rate, Icon } from 'antd'
import ReactMarkdown from 'react-markdown'
require('./comment.css')


const Comment = ({ comment, comments, children, level, asteri, dispatch }) => {

	const [isCollapsed, collapse] = useState(false)
	const [isClicked, click] = useState(false)

	return (
		<Row
			type="flex"
			justify="space-around"
			style={level === 0 ? {marginBottom: 16} : {}}
		>
			<Col
				// span={1}
				style={{textAlign: "center", width: 24}}
			>
				{
					isCollapsed ?
					<Star
						type="plus-circle"
						onClick={() => collapse(!isCollapsed)}
					/>
					:
					<Star
						key={"star" + comment._id}
						onClick={() => {
							click(!isClicked)
							dispatch(asteri(comment._id))
						}}
						defaultClick={isClicked}
					/>
				}
				{
					!isCollapsed &&
					<Divider
						type="vertical"
						style={{
							height: "calc(100% - 20px)",
							display: "block",
							margin: "0 auto",
							width: 3,
							cursor: "pointer",
							background: ["#fac89e","#e3e891","#c2fc99","#a3fcb3","#92e8d5","#96c8f2","#ada8ff","#ce94f7","#ed94dd","#fea8bb"][level]
						}}
						onClick={() => collapse(!isCollapsed)}
					/>
				}
			</Col>
			<Col
				span={23}
			>
				<Link linkType="user" id={comment.author}></Link>
				{
					!isCollapsed &&
					<React.Fragment>
						<ReactMarkdown source={!comment.deleted ? comment.body : "`[deleted]`"} className="comment"/>
						<Actions
							id={comment._id}
							author={comment.author}
						/>
						{children}
					</React.Fragment>
				}
			</Col>
		</Row>
	)
}

export default Comment
