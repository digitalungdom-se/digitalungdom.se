import React from 'react'
import { Row, Col, Rate, Card, Skeleton } from 'antd'
import './post.css'

class Post extends React.Component {

	render() {

		const { post, loading, children } = this.props

		if(loading) return <div>Post loading...</div>;
		const deleted = post.deleted
		// console.log(post.stars)
		console.log(post)

		return (
			<Card
				bodyStyle={{padding: '10px 20px 10px 0'}}
				className="agora-post"
			>
				<Row
				>
					<Col
						span={3}
						className="starCol"
					>
						<Rate
							defaultValue={0} count={1}
						/>
						<div>
							{post.stars}
						</div>
					</Col>
					<Col
						span={21}
					>
					<Skeleton active loading={loading}>
						<Row className="info">
							<span></span>
						</Row>
						<Row>
								<h1>{post.title}</h1>
						</Row>
					</Skeleton>
					</Col>
				</Row>
			</Card>
		)
	}
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
