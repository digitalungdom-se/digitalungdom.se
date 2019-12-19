import React, { useState } from 'react'
import { Avatar, Dropdown, Divider, Empty, Row, Col, Card, Menu, Skeleton, Tag } from 'antd'
import Link from 'containers/Link'
import { Redirect } from 'react-router'
import Time from '@components/Time'
import Modal from '@components/Modal'
import ProfilePicture from 'containers/ProfilePicture'
import Agorize from 'containers/agorize'
import './post.css'
import ReactMarkdown from 'react-markdown'
import Comments from 'containers/comments'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faShare, faStar, faPen, faFlag, faCopy, faEllipsisH, faTrash } from '@fortawesome/free-solid-svg-icons'

const shareMenu = ( link ) => (
  <Menu>
    <Menu.Item>
      <span onClick={()=>copyPostLinkToClipBoard(link)}>
        <FontAwesomeIcon style={{marginRight: 4}} icon={faCopy} /> Kopiera länk
      </span>
    </Menu.Item>
  </Menu>
)

const ModalButton = ( { reportPost } ) => {

  const [ modalVisible, showModal ] = useState( false )

  const onCancel = () => {
    showModal( false );
  }
  const onConfirm = () => showModal( false );

  return (
    <span>
      <span onClick={() => showModal(true)}>
        <FontAwesomeIcon style={{marginRight: 4}} icon={faFlag} /> Anmäl inlägg
      </span>
      <Modal
        visible={modalVisible}
        title="Anmäl"
        description="Skriv en anledning"
        confirmText="Anmäl"
        cancelText="Avbryt"
        handleConfirm={(reason) => reportPost(reason)}
        onConfirm={() => onConfirm()}
        onCancel={() => onCancel()}
        showInput
      />
    </span>
  )
}

const moreMenu = ( reportPost, hidePost, antiAgorize, deleteTemp ) => {

  return (
    <Menu>
      <Menu.Item>
        <ModalButton
          reportPost={reportPost}
        />
      </Menu.Item>
    </Menu>
  )
  // TO-DO: Add hide post button.
  /*
    <Menu.Item>
        <span onClick={hidePost}>
          <FontAwesomeIcon style={{marginRight: 4}} icon={faEyeSlash} /> Hide post
        </span>
      </Menu.Item>
  */
};

const editMenu = ( antiAgorize, deleteTemp ) => (
  <Menu>
    <Menu.Item>
      <span
      onClick={()=> {
        antiAgorize()
        deleteTemp(true)
      }}>
        <FontAwesomeIcon style={{marginRight: 4}} icon={faTrash} /> Radera inlägg
      </span>
    </Menu.Item>
  </Menu>
);
// TO-DO: Add edit post.
/*
<Menu.Item>
  <FontAwesomeIcon style={{marginRight: 4}} icon={faWrench} /> Edit post
</Menu.Item>
*/

//Takes post redux link and merges it with window href to create a post link, which is copied to the clipboard
function copyPostLinkToClipBoard( link ) {
  const el = document.createElement( 'input' );
  //TODO: maybe not the cleanest solution, fix this later
  var currentURL = window.location.href
  el.value = currentURL.substring( 0, currentURL.indexOf( "/agora" ) ) + link;
  el.id = "url-input";
  document.body.appendChild( el );
  el.select();
  document.execCommand( "copy" );
  el.remove();
}

function Markdown({ source }) {
  return (
    <ReactMarkdown
      source={source}
      renderers={{
        heading: props => {
          switch(props.level) {
            case 1:
              return <h1>{props.children}</h1>;
            case 2:
              return <h2>{props.children}</h2>;
            case 3:
              return <h3 style={{color: "black"}}>{props.children}</h3>;
            case 4:
              return <h4>{props.children}</h4>;
            case 5:
              return <h5>{props.children}</h5>;
            case 6:
              return <h6>{props.children}</h6>;
            default:
              return null;
          }
        },
        link: props => {
          const href = (props.href.indexOf("https://") === -1 && props.href.indexOf("http://") === -1 ) ? "https://" + props.href : props.href
          return (
            <a href={href}>{props.children}</a>
          );
        },
        paragraph: props => {
          return (
            <p style={{wordBreak: "break-word"}}>
              {props.children}
            </p>
          )
        }
      }}
    />
  )
}

function Post( {
  authorized,
  empty,
  post,
  loading,
  children,
  link,
  asteri,
  report = () => {},
  antiAgorize,
  hidePost,
  showComments,
  isAuthor,
  starred,
  showProfilePicture,
  redirect
} ) {
  // Hook describing if a post is stared or not
  const [ isStarClicked, clickStar ] = useState( starred )
  const [ tempDeleted, deleteTemp ] = useState( false )

  // Must authenticate modal
  const [mustAuthModalVisible, showMustAuthModal] = useState(false)
  const onMustAuthCancel = () => showMustAuthModal(false);
  const onMustAuthConfirm = () => showMustAuthModal(false);

  // Function that allows whole post to be pressed excluding buttons such as share and edit.
  function click( e ) {
    //Silly work around for allowing user to press the comment icon and redirect
    if ( e.target.parentNode.className !== undefined && e.target.parentNode.className.includes("ShouldOpenPost") ) {
      redirect( link )
    }
  }

  if ( empty ) return (
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

  if ( loading ) return (
    <div>
			<Card>
			   <Skeleton active avatar paragraph={{ rows: 2 }} />
			</Card>
		</div>
  )

  let wordLimitFadedDisplay = 500;

  //Renders post body
  const Body = () => {

    //For some reason you must wait
    if ( post.body ) {

      //If the post is a link, render this
      if ( post.type === 'link' ) {
        return (
            <a
              href={(post.body.indexOf("https://") === -1 && post.body.indexOf("http://") === -1 ) ? "https://" + post.body : post.body}
              rel="noopener noreferrer"
              style={{fontSize: 16, wordWrap: "break-word", display: "block" }}
              target="_blank"
            >
              {post.body}
            </a>
          )
      } else {
        //If its a text post with more than characters, render transparent faded div
        if ( post.body.length > wordLimitFadedDisplay ) {
          return (

                      //Post is open if the comments are showing
                      showComments?
                      (<Markdown source={post.body} />)
                      :
                      (
                        <div className="ShouldOpenPost" >
                        <Markdown source={post.body.slice(0, wordLimitFadedDisplay) + "..."} />
                        <div style={{position: 'absolute', bottom: 0, height: 100, width: "100%", backgroundImage: "linear-gradient(rgba(255,255,255,0), rgba(255,255,255,1))"}}/>
                        </div>
                      )


          )

          //For shorter posts
        } else {
          return (
							<Markdown source={post.body} />
          )
        }
      }

    } else {
      // Should this say loading?
      return null
    }
  }

  //If the post is deleted it will disappear from the current user
  if ( tempDeleted ) {
    return <Redirect to="/agora" />
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
				<div
					style={{color: "rgba(0,0,0,0.6)", display: "flex"}}
				>
					<Col
						style={{textAlign: "center", paddingTop: 20, width: "10%", minWidth: 56, maxWidth: 72}}
            className="ShouldOpenPost"
					>
						{
							showProfilePicture ?
								<ProfilePicture id={post.author} size={40}/>
							:
								<Avatar
									size={40}
                  src={require("resources/images/noProfilePicture.png")}
                  alt="No Profile Picture"
								/>
						}
					</Col>
					<div
						style={{paddingTop: 8, width: "calc(100% - 56px)"}}
            span={22}
            className={showComments ? null : "ShouldOpenPost"}
					>
						<Row
							style={{width: "100%"}}
							type="flex"
							justify="space-between"
              className="ShouldOpenPost"
						>
							<Col>
								<Link
									linkType="user"
									id={post.author}
                  className="WillNotOpenPostDiv"
								/>
							</Col>
							<Col
              className="ShouldOpenPost"
              >
								<Time time={post._id.substring(0, 8)} />
								<Divider type="vertical"/>
								<Link to={"/agora/h/" + post.hypagora}>
									<Tag>{post.hypagora}</Tag>
								</Link>
							</Col>
						</Row>
						<Row style={{width: "100%"}} className="ShouldOpenPost" >
								<h1>{post.title}</h1>
						</Row>

	          <Row
            style={{width: "100%"}}
            >
	            <Body/>
	          </Row>

						<div
            style={{paddingBottom: 8}}
            className="ShouldOpenPost"
            >
							{
								showComments
							}
							{
								!loading && post.tags.map(tag => <Tag style={{opacity: 0.6}}key={tag}>{tag}</Tag>)
							}
						</div>


						<Row style={{fontSize: 16, marginBottom: 10}}>

							<Col
              xs={{span: 6}}
  						sm={{span: 4}}
              style={{textAlign: 'center', height: 30}}
              className="asteriButton"
              onClick={() => {
                if(authorized){
                  clickStar(!isStarClicked)
                  asteri(post._id)
                }else{
                  showMustAuthModal(true)
                }
              }}
              >
								<div className = "WillNotOpenPostDiv" style={{width: "100%", height: "100%", paddingTop: 2}}>
									<FontAwesomeIcon style={{marginRight: 4}} color={isStarClicked ? "gold" : ""} icon={faStar} /> {post.stars}
								</div>
							</Col>

							<Col
              xs={{span: 6}}
  						sm={{span: 4}}
              style={{ textAlign: 'center', height: 30, paddingLeft: 8}}
              className="optionButton"
              >
                <div className="ShouldOpenPost" style={{width: "100%", height: "100%", paddingTop: 2, }}>
                  <FontAwesomeIcon style={{marginRight: 4}} icon={faComment} /> {post.commentAmount}
                </div>
							</Col>

              <Col
              xs={{span: 6}}
  						sm={{span: 4}}
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
              xs={{span: 6}}
  						sm={{span: 4}}
              style={{ textAlign: 'center', height: 30}}
              className="optionButton"
              >

                <Dropdown
                overlay={moreMenu(report, hidePost, antiAgorize, deleteTemp)}
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
                  xs={{span: 6}}
      						sm={{span: 4}}
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
				</div>
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

      <Modal
        visible={mustAuthModalVisible}
        title="Logga in eller bli medlem!"
        description={"Du måste vara inloggad för att skriva gilla ett inlägg."}
        modalType="mustAuthenticate"
        handleConfirm={() => onMustAuthConfirm()}
        onConfirm={() => onMustAuthConfirm()}
        onCancel={() => onMustAuthCancel()}
      />

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

// export default () => {
//   const [modalVisible, showModal] = useState(false)

//   const onCancel = () => showModal(false)
//   const onConfirm = () => showModal(false)

//   return (
//     <span>
//       <button
//         onClick={() => showModal(!modalVisible)}
//       >
//         Delete account
//       </button>
//       <Modal
//         title="Är du säker? 🗑️"
//         description={"Ifall du trycker på \"Radera\" test kommer ditt konto raderas permanent."}
//         visible={modalVisible}
//         confirmText="Radera"
//         cancelText="Avbryt"

//         onCancel={onCancel}
//         onConfirm={onConfirm}
//       />
//     </span>
//   )
// }


export default Post
