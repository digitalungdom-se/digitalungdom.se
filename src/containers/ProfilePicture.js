import React from 'react'
import { Avatar } from 'antd'
import { getProfilePictureByUsername,  getProfilePictureByID} from 'actions/users'
import { useSelector } from 'react-redux'


function ProfilePicture({ size, username, id }) {
	
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     src: "",
  //     size: props.size,
  //     username: props.username,
  //     id: props.id,
  //   };
  // }

  // // Do asynchronous action here
  // async componentWillMount() {
  //     const size = this.state.size;
  //     const username = this.state.username;
  //     const id = this.state.id;
  //     let res;

  //     if(username){
  //       res = await getProfilePictureByUsername( username, size ).callAPI();
  //     } else if (id) {
  //       res = await getProfilePictureByID( id, size ).callAPI();
  //     }

  //     if(res && res.status === 200 ){
  //       const image = await res.json();
  //       const src = `data:${image.imageType.mime};base64, ${image.image}`;
  //       this.setState({src})
  //     }
  // }

  // render() {
  //     const { src, size } = this.state;
  //     return <Avatar icon="user" src={src} size={size}/>
  // }
}

export default ProfilePicture
