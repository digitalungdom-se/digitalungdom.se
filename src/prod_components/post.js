import React, { useState } from 'react'
import { Avatar, Button, Dropdown, Divider, Empty, Row, Col, Rate, Card, Menu, Skeleton, Icon, Tag, Input } from 'antd'
import Link from 'containers/Link'
import { Redirect } from 'react-router'
import { Route } from 'react-router-dom'
import Star from '@components/star'
import Time from '@components/Time'
 import ProfilePicture from 'containers/ProfilePicture'
import {agorizeComment} from 'containers/agorize'
import './post.css'
import ReactMarkdown from 'react-markdown'
import Comments from 'containers/comments'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faShare, faStar, faPen, faFlag, faCopy, faEllipsisH, faEyeSlash } from '@fortawesome/free-solid-svg-icons'


const shareMenu = (
  <Menu>
    <Menu.Item>
      <span>
        <FontAwesomeIcon style={{marginRight: 4}} icon={faCopy} /> Copy post link
      </span>
    </Menu.Item>
  </Menu>
);

const moreMenu = (
  <Menu>
    <Menu.Item>
      <FontAwesomeIcon style={{marginRight: 4}} icon={faFlag} /> Flag post
    </Menu.Item>
    <Menu.Item>
      <FontAwesomeIcon style={{marginRight: 4}} icon={faEyeSlash} /> Hide post
    </Menu.Item>
  </Menu>
);

function Post({ empty, post, loading, children, link, asteri, showComments, starred, showProfilePicture, user, redirect }) {

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

	let wordLimitFadedDisplay = 400;

	//Renders post body
  const Body = () => {

		//For some reason you must wait, this the if statment
		if(post.body) {

			//If the post is a link, render this
			if( post.type === 'link'){
	      return (<p><a href={post.body} style={{fontSize: 16}} target="_blank"> {post.body} </a></p>)
	    }else{
				//If its a text post with more than characters, render transparent faded div
				if(post.body.length > wordLimitFadedDisplay){
					return(
						<span to={link} style={{color:"rgba(0,0,0,0.7)", fontSize: 14 }}>
							<div style={{postion: 'relative'}}>

										{
                      //Post is open if the comments are showing
                      showComments?
                      (<p>{post.body}</p>)
                      :
                      (
                        <div>
                        <p>{post.body.slice(0, wordLimitFadedDisplay) + "..."}</p>
                        <div style={{position: 'absolute', bottom: 0, height: 100, width: "100%", backgroundImage: "linear-gradient(rgba(255,255,255,0), rgba(255,255,255,1))"}}/>
                        </div>
                      )

                    }

							</div>
						</span>
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

	function click(e) {
    console.log(e.target.nodeName)
		if(e.target.nodeName === 'DIV' || e.target.nodeName === 'P') {
      redirect(link)
    }
	}

	return (
		<React.Fragment>
			<Card
				className="agora-post"
				bodyStyle={{padding: 8, paddingRight: "5%" }}
        onClick={click}
	      // style={!showComments ? {marginBottom: 12} : {marginTop: "5%"}}
	      style={{
	      	marginBottom: 16
	      }}
	    >
				<span
					style={{color: "rgba(0,0,0,0.6)", display: "flex"}}
				>
					<Col
						style={{textAlign: "center", paddingTop: 20, width: "10%", minWidth: 56, maxWidth: 72}}
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
									id={post.author}
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


						<Row gutter={16} style={{fontSize: 16, marginBottom: 10}}>

							<Col span={4}>
								<span
								className="asteriButton"
								onClick={() => {
									clickStar(!isStarClicked)
									asteri(post._id)
								}}>
									<FontAwesomeIcon style={{marginRight: 4}} color={isStarClicked ? "gold" : ""} icon={faStar} /> {post.stars}
								</span>
							</Col>

							<Col span={4}>
								<span className="optionButton">
									<FontAwesomeIcon style={{marginRight: 4}} icon={faComment} /> {post.commentAmount}
								</span>
							</Col>

							<Col span={4}>
								<span className="optionButton">
                  <Dropdown overlay={shareMenu}>
                    <FontAwesomeIcon style={{marginLeft: 8}} icon={faShare} />
                  </Dropdown>
								</span>
							</Col>

              <Col span={4}>
                <span className="optionButton">
                  <Dropdown overlay={moreMenu}>
                    <FontAwesomeIcon icon={faEllipsisH} />
                  </Dropdown>
                </span>
              </Col>

              <Col span={4}>
                <span className="optionButton">
                  <FontAwesomeIcon icon={faPen} />
                </span>
              </Col>

						</Row>
					</div>
				</span>
        {
        	!loading && showComments &&
        	<React.Fragment>
        		<Col
        			// pull={3}
        		>
        			<agorizeComment
        				id={post._id}
        				agoragramType="comment"
        			/>
        		</Col>
        		<Col
        			style={{paddingTop: 16}}
        		>
        			<Comments children={post.children} level={0} />
        		</Col>
      		</React.Fragment>
        }
			</Card>
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
