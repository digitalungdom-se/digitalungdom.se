import React, { useState } from 'react'
import { Button, Divider, Empty, Row, Col, Rate, Card, Skeleton, Icon, Tag, Input } from 'antd'
import Link from '@components/link.js'
import Star from '@components/star'
import Reply from 'containers/Reply'
import './post.css'
import Comments from 'containers/comments'

function Post({ empty, post, loading, children, link, asteri, comments }) {

	if(empty) return (
		<Card>
			<Empty
				style={{marginTop: 32}}
				description={
					<span>
						Inga inlägg hittades med detta filter!
					</span>
				}
			/>
		</Card>
	)

	if(loading) return <div>Post loading...</div>;
	const deleted = post.deleted

	const [isStarClicked, clickStar] = useState(false)
	// console.log(post.stars)

	return (
		<Card
			bodyStyle={{padding: '10px 20px 10px 0'}}
			className="agora-post"
			bodyStyle={{padding: 0}}
		>
			<Row
				type="flex"
				style={{borderBottom: "1px solid #e8e8e8"}}
			>
				<Col
					xs={{span: 4}}
					sm={{span: 3}}
					className="starCol"
					style={{background: "#f8f8f8"}}
				>
					<Row
						type="flex" align="middle" justify="center" className="ratings" gutter={16}
						onClick={() => {
							clickStar(!isStarClicked)
							asteri(post._id)}
						}
						style={{height: 48, cursor: "pointer"}}
					>
						<Col>
							<Star
								key={"star" + post._id}
								size={32}
								style={{height: 32}}
								defaultClick={isStarClicked}
							/>
						</Col>
						<Col className="number">
							<span style={{height: 24, fontSize: 16}}>
								{post.stars}
							</span>
						</Col>
					</Row>
					<Link to={link}>
						<Row
							type="flex" align="middle" justify="center" className="ratings" gutter={16}
							style={{height: 48}}
						>
							<Col>
								<Icon
									type="message"
									theme="twoTone"
									style={{fontSize: 32}}
									twoToneColor={"grey"}
								/>
							</Col>
							<Col className="number">
								<span style={{height: 24, fontSize: 16}}>
									{post.commentAmount}
								</span>
							</Col>
						</Row>
					</Link>
				</Col>
				<Col
					xs={{span: 20}}
					sm={{span: 21}}
					className="otherCol"
				>
					<Row
						type="flex"
						justify="center"
					>
						<Col
							span={23}
						>
							<Skeleton active loading={loading}>
								<Row className="info">
									<Link type="user" id={post.author}></Link>
								</Row>
								<Row>
										<h1>{post.title}</h1>
								</Row>
								<Row>
									{
										!loading && post.tags.map(tag => <Tag>{tag}</Tag>)
									}
								</Row>
							</Skeleton>
						</Col>
					</Row>
				</Col>
			</Row>
			{
				!loading && comments &&
				<Row
					type="flex"
					justify="center"
					style={{paddingTop: 16}}
				>
					<Col
						span={23}
						// pull={3}
					>
						<Reply
							id={post._id}
						/>
					</Col>
					<Col
						span={23}
						style={{paddingTop: 16}}
					>
						<Comments children={post.children} level={0} />							
					</Col>
				</Row>	
			}
		</Card>
	)
	/*<div>Author: {(!deleted && author !== "deleted") ? ((post.display.type === "user") ? author.details.username : author.details.name) : "deleted"}</div>*/
}

/*
	<h1>{post.title}</h1>
	<div>Modified:{post.modified}</div>
	<div>Stars:{post.stars}</div>
	<p>{!deleted ? post.body : "deleted"}</p>
	{post.tags ?
		<ul>
			{post.tags.map(tag => <li key={tag} >{tag}</li>)}
		</ul>
		: null
	}
	{children}
</Card>
*/


export default Post
