import React, { useState } from 'react'
import { Avatar, Button, Divider, Empty, Row, Col, Rate, Card, Skeleton, Icon, Tag, Input } from 'antd'
import Link from '@components/link'
import { Redirect } from 'react-router';
import Star from '@components/star'
import Time from '@components/Time'
 import ProfilePicture from '@components/ProfilePicture'
import {agorizeComment} from 'containers/agorize'
import './post.css'
import ReactMarkdown from 'react-markdown'
import Comments from 'containers/comments'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faShare, faStar } from '@fortawesome/free-solid-svg-icons'

function Post({ empty, post, loading, children, link, asteri, showComments, starred, showProfilePicture, user }) {

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

	let wordLimitFadedDisplay = 600;

	//Renders post body
  const Body =() => {

		//For some reason you must wait, this the if statment
		if(post.body) {

			//If the post is a link, render this
			if( post.type === 'link'){
	      return (<p><a href={post.body} style={{fontSize: 16}} target="_blank"> {post.body} </a></p>)
	    }else{
				//If its a text post with more than characters, render transparent faded div
				if(post.body.length > wordLimitFadedDisplay){
					return(
						<Link to={link} style={{color:"rgba(0,0,0,0.7)", fontSize: 14 }}>
							<div style={{postion: 'relative'}}>
								<p>
										{post.body.slice(0, wordLimitFadedDisplay) + "..."}
								</p>
								<div style={{position: 'absolute', bottom: 0, height: 100, width: "100%", backgroundImage: "linear-gradient(rgba(255,255,255,0), rgba(255,255,255,1))"}}/>
							</div>
						</Link>
					)

				//For shorter posts
				}else{
					return (
						<Link style={{color:"rgba(0,0,0,0.7)", fontSize: 16 }}>
							<ReactMarkdown source={post.body} />
						</Link>
					)
				}
			}

		}else{
			return <p> Loading... </p>
		}
	}


	const [isStarClicked, clickStar] = useState(starred)

	return (
		<React.Fragment>
			<Card
				className="agora-post"
				bodyStyle={{padding: 8, paddingLeft: 0}}
	      style={!showComments ? {marginBottom: 12} : {}}
	    >
				<Link
					to={link}
					style={{color: "rgba(0,0,0,0.6)", display: "flex"}}
				>
					<Col
						style={{textAlign: "center", paddingTop: 24, width: "10%", minWidth: 56, maxWidth: 72}}
					>
						{
							showProfilePicture ?
								<ProfilePicture id={post.author} size={40}/>
							:
								<Avatar
									size={40}
								/>
						}
					</Col>
					<div
						style={{paddingTop: 8, flex: "1"}} span={22}
					>
						<Row
							style={{width: "100%"}}
							type="flex"
							justify="space-between"
						>
							<Col>
								<Link
									linkType="user"
									user={user}
								/>
							</Col>
							<Col>
								<Time time={post._id.substring(0, 8)} />
								<Divider type="vertical"/>
								<Link to={"/agora/h/" + post.hypagora}>
									<Tag>{post.hypagora}</Tag>
								</Link>
							</Col>
						</Row>
						<Row style={{width: "100%"}}>
							<Link to={link}>
								<h1>{post.title}</h1>
							</Link>
						</Row>

	          <Row style={{width: "100%"}}>
	            <Body/>
	          </Row>

						<Row style={{paddingBottom: 8}}>
							{
								showComments
							}
							{
								!loading && post.tags.map(tag => <Tag style={{opacity: 0.6}}key={tag}>{tag}</Tag>)
							}
						</Row>


						<Row gutter ={20} style={{fontSize: 16, marginBottom: 10}}>

							<Col span={5}>
								<span
								className="asteriButton"
								onClick={() => {
									clickStar(!isStarClicked)
									asteri(post._id)
								}}>
									<FontAwesomeIcon style={{marginRight: 4}} color={isStarClicked ? "gold" : ""} icon={faStar} /> {post.stars}
								</span>
							</Col>

							<Col span={5}>
								<span className="commentButton">
									<FontAwesomeIcon style={{marginRight: 4}} icon={faComment} /> {post.commentAmount}
								</span>
							</Col>

							<Col span={5}>
								<span className="shareButton">
									<FontAwesomeIcon icon={faShare} />
								</span>
							</Col>

						</Row>
					</div>
				</Link>
			</Card>

			{
				!loading && showComments &&
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
