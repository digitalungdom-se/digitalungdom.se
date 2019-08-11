import React, { useState } from 'react'
import { Button, Divider, Empty, Row, Col, Rate, Card, Skeleton, Icon, Tag, Input } from 'antd'
import Link from '@components/link.js'
import Star from '@components/star'
import Time from '@components/Time'
import Agorize from 'containers/agorize'
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
							asteri(post._id)
						}}
						style={{height: 48, cursor: "pointer"}}
					>
						<Col
							span={10}
						>
							<Star
								key={"star" + post._id}
								size={32}
								style={{height: 32}}
								defaultClick={isStarClicked}
							/>
						</Col>
						<Col className="number" span={10}>
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
							<Col span={10} >
								<Icon
									type="message"
									theme="twoTone"
									style={{fontSize: 32}}
									twoToneColor={"grey"}
								/>
							</Col>
							<Col className="number" span={10}>
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
					style={{
						paddingTop: 8,
						paddingLeft: 8
					}}
				>
					<Skeleton active loading={loading}>
						<Row
							type="flex"
							justify="space-between"
						>
							<Col>
								<Link linkType="user" id={post.author} />
								<Divider type="vertical"/>
								<Time time={post._id.substring(0, 8)} />
							</Col>
							<Col
							>
								<Link to={"/agora/h/" + post.hypagora}>
									<Tag>{post.hypagora}</Tag>
								</Link>
							</Col>
						</Row>
						<Row>
							<Link to={link}>
								<h1>{post.title}</h1>
							</Link>
						</Row>
						<Row
							style={{paddingBottom: 8}}
						>
							{
								!loading && post.tags.map(tag => <Tag key={tag}>{tag}</Tag>)
							}
						</Row>
					</Skeleton>
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
						<Agorize
							id={post._id}
							agoragramType="comment"
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
