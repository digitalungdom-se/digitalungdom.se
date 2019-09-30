import React, { useState } from 'react'
import { Avatar, Button, Dropdown, Divider, Empty, Row, Col, Rate, Card, Menu, Skeleton, Icon, Tag, Input } from 'antd'
import Link from 'containers/Link'
import { Redirect } from 'react-router'
import { Route } from 'react-router-dom'
import Star from '@components/star'
import Time from '@components/Time'
 import ProfilePicture from 'containers/ProfilePicture'
import Agorize from 'containers/agorize'
import './post.css'
import ReactMarkdown from 'react-markdown'
import Comments from 'containers/comments'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faShare, faStar, faPen, faFlag, faCopy, faEllipsisH, faEyeSlash, faTrash, faWrench } from '@fortawesome/free-solid-svg-icons'

const shareMenu = (link) => (
  <Menu>
    <Menu.Item>
      <span onClick={()=>copyPostLinkToClipBoard(link)}>
        <FontAwesomeIcon style={{marginRight: 4}} icon={faCopy} /> Copy post link
      </span>
    </Menu.Item>
  </Menu>
)

const moreMenu = (reportPost, hidePost) => (
  <Menu>
    <Menu.Item>
      <span onClick={reportPost}>
        <FontAwesomeIcon style={{marginRight: 4}} icon={faFlag} /> Report post
      </span>
    </Menu.Item>
    <Menu.Item>
      <span onClick={hidePost}>
        <FontAwesomeIcon style={{marginRight: 4}} icon={faEyeSlash} /> Hide post
      </span>
    </Menu.Item>
  </Menu>
);

const editMenu = (antiAgorize, deleteTemp ) => (
  <Menu>
    <Menu.Item>
      <FontAwesomeIcon style={{marginRight: 4}} icon={faWrench} /> Edit post
    </Menu.Item>
    <Menu.Item>
      <span
      onClick={()=> {
        antiAgorize()
        deleteTemp(true)
      }}>
        <FontAwesomeIcon style={{marginRight: 4}} icon={faTrash} /> Delete post
      </span>
    </Menu.Item>
  </Menu>
);

//Takes post redux link and merges it with window href to create a post link, which is copied to the clipboard
function copyPostLinkToClipBoard(link) {
  const el = document.createElement('input');
  //TODO: maybe not the cleanest solution, fix this later
  var currentURL = window.location.href
  el.value = currentURL.substring(0,currentURL.indexOf("/agora")) + link;
  el.id = "url-input";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  el.remove();
}

function Post({ authorized, empty, post, loading, children, link, asteri, report, antiAgorize, hidePost, showComments, isAuthor, starred, showProfilePicture, redirect }) {
  //Hook describing if a post is stared or not
  const [isStarClicked, clickStar] = useState(starred)
  const [tempDeleted, deleteTemp] = useState(false)

  //Function that allows whole post to be pressed excluding buttons such as share and edit.
	function click(e) {
    //Check if target is not button in post
		if(typeof e.target.className === "string") {
      if(!e.target.className.includes("WillNotOpenPostDiv") && e.target.tagName !== "SPAN" && e.target.tagName !== "svg" && e.target.tagName !== "UL" && e.target.tagName !== "LI"){
          // redirect(link)
      }
    }
	}

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

		//For some reason you must wait
		if(post.body ) {

			//If the post is a link, render this
			if( post.type === 'link'){
	      return (<p><a href={post.body} style={{fontSize: 16}} target="_blank"> {post.body} </a></p>)
	    }else{
				//If its a text post with more than characters, render transparent faded div
				if(post.body.length > wordLimitFadedDisplay){
					return(
						<Link to={link} style={{color:"rgba(0,0,0,0.7)", fontSize: 14 }}>
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
						</Link>
					)

				//For shorter posts
				}else{
					return (
						<Link style={{color:"rgba(0,0,0,0.7)", fontSize: 16 }} to={link}>
							<ReactMarkdown source={post.body} />
						</Link>
					)
				}
			}

		}else{
			// Should this say loading?
			return null
		}
	}

  //If the post is deleted it will disappear from the current user
  if(tempDeleted){
    return null
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
                  className="WillNotOpenPostDiv"
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

						<div style={{paddingBottom: 8}}>
							{
								showComments
							}
							{
								!loading && post.tags.map(tag => <Tag style={{opacity: 0.6}}key={tag}>{tag}</Tag>)
							}
						</div>


						<Row style={{fontSize: 16, marginBottom: 10}}>

							<Col
              span={4}
              style={{textAlign: 'center', height: 30}}
              className="asteriButton"
              onClick={() => {
                clickStar(!isStarClicked)
                asteri(post._id)
              }}
              >
								<div className = "WillNotOpenPostDiv" style={{width: "100%", height: "100%", paddingTop: 2}}>
									<FontAwesomeIcon style={{marginRight: 4}} color={isStarClicked ? "gold" : ""} icon={faStar} /> {post.stars}
								</div>
							</Col>

							<Col
              span={4}
              style={{ textAlign: 'center', height: 30, paddingLeft: 8}}
              className="optionButton"
              >
                <div style={{width: "100%", height: "100%", paddingTop: 2, }}>
                  <FontAwesomeIcon style={{marginRight: 4}} icon={faComment} /> {post.commentAmount}
                </div>
							</Col>

              <Col
              span={4}
              style={{ textAlign: 'center', height: 30}}
              className="optionButton"
              >

                <Dropdown
                overlay={shareMenu(link)}
                trigger={['click']}
                >

                  <div className = "WillNotOpenPostDiv" style={{width: "100%", height: "100%", paddingTop: 2, }}>
                      <FontAwesomeIcon style={{marginLeft: 8}} icon={faShare} />
  								</div>
                </Dropdown>
							</Col>


              <Col
              span={4}
              style={{ textAlign: 'center', height: 30}}
              className="optionButton"
              >

                <Dropdown
                overlay={moreMenu(report, hidePost)}
                trigger={['click']}
                >

                  <div className = "WillNotOpenPostDiv" style={{width: "100%", height: "100%", paddingTop: 2 }}>
                    <FontAwesomeIcon icon={faEllipsisH} />
  								</div>

                </Dropdown>
              </Col>

              {
                isAuthor?
                (
                  <Col
                  span={4}
                  style={{ textAlign: 'center', height: 30}}
                  className="optionButton"
                  >

                    <Dropdown
                    overlay={editMenu(antiAgorize, deleteTemp, )}
                    trigger={['click']}
                    >

                      <div className = "WillNotOpenPostDiv" style={{width: "100%", height: "100%", paddingTop: 2, }}>
                        <FontAwesomeIcon icon={faPen} />
      								</div>

                    </Dropdown>
                  </Col>
                )
                :
                null
              }

						</Row>
					</div>
				</span>
        {
        	!loading && showComments &&
        	<React.Fragment>
        		<Col
        			// pull={3}
        		>
        			<Agorize
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
