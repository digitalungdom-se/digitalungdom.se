import React, { useState } from 'react'
import { Avatar, Button, Divider, Empty, Row, Col, Rate, Card, Skeleton, Icon, Tag, Input } from 'antd'
import Link from '@components/link.js'
import Star from '@components/star'
import Time from '@components/Time'
import {agorizeComment} from 'containers/agorize'
import './post.css'
import ReactMarkdown from 'react-markdown'
import Comments from 'containers/comments'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faShare, faStar } from '@fortawesome/free-solid-svg-icons'

function Post({ empty, post, loading, children, link, asteri, comments, starred }) {

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
	);

	if(loading) return (
		<div>
			<Card>
			<Skeleton active avatar paragraph={{ rows: 2 }} />
			</Card>
		</div>
	)
	const deleted = post.deleted

  let body;
  if( post.type === 'link'){
      body =( <p><a href={post.body} target="_blank"> {post.body} </a></p> )
    } else {
      body = (
        <Link to={link} style={{color:"grey"}}>
        <ReactMarkdown source={post.body} />
        </Link>
      )
    }

	const [isStarClicked, clickStar] = useState(starred)
	// console.log(post.stars)

	return (
		<React.Fragment
		>
			<Card
				// bodyStyle={{padding: '10px 20px 10px 0'}}
				className="agora-post"
				bodyStyle={{padding: 0}}
				actions={[
	        <span
	        	onClick={() => {
	        		clickStar(!isStarClicked)
	        		asteri(post._id)
	        	}}
	        >
	        	<FontAwesomeIcon color={isStarClicked ? "gold" : ""} icon={faStar} /> {post.stars}
	        </span>,
	        <Link to={link}
	        >
	        	<FontAwesomeIcon icon={faComment} /> {post.commentAmount}
	        </Link>
	        // <FontAwesomeIcon icon={faShare} />,
	      ]}
	      style={!comments ? {marginBottom: 12} : {}}
			>
				<Row
					type="flex"
				>
					<Col
						span={3}
						style={{textAlign: "center", paddingTop: 8}}
					>
						<Avatar icon="user" size={48}/>
					</Col>
					<Col
						style={{paddingTop: 8}}
						span={21}
					>
						<Row
							style={{width: "100%"}}
							type="flex"
							justify="space-between"
						>
							<Col>
								<Link linkType="user" id={post.author} />
							</Col>
							<Col
							>
								<Time time={post._id.substring(0, 8)} />
								<Divider type="vertical"/>
								<Link to={"/agora/h/" + post.hypagora}>
									<Tag>{post.hypagora}</Tag>
								</Link>
							</Col>
						</Row>
						<Row
							style={{width: "100%"}}
						>
							<Link to={link}>
								<h1>{post.title}</h1>
							</Link>
						</Row>
            <Row style={{width: "100%"}}>
              {body}
            </Row>
						<Row
							style={{paddingBottom: 8}}
						>
							{
								comments
							}
							{
								!loading && post.tags.map(tag => <Tag key={tag}>{tag}</Tag>)
							}
						</Row>
					</Col>
				</Row>
			</Card>
			{
				!loading && comments &&
				<Row
					type="flex"
					justify="center"
					style={{
						background: "white",
						border: "1px solid #e8e8e8",
						paddingTop: 16
					}}
				>
					<Col
						span={23}
						// pull={3}
					>
						<agorizeComment
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
		</React.Fragment>
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
