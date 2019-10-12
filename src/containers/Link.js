import React from 'react'
import { useSelector } from 'react-redux'
import Link from '@components/link'

export default ( { linkType, id, user, ...props } ) => {
  switch ( linkType ) {
  case 'user':
    const user = useSelector( state => state.Users.users[ id ] )
    if ( user ) return (
      !user.details ?
      <Link
						linkType={linkType}
						id={id}
						{...props}
					>
						[deleted]
					</Link> :
      <Link to={"/@" + user.details.username} {...props} style={{color:user.profile.colour ? user.profile.colour : '#83aef2'}}>
					{user.details.name}
				</Link>
    );
    // TO-DO: Add "Loading..." if the id is defined but not loading. Remember to check the case where the account has been deleted.
    else return <code>[raderad]</code>
  default:
    return (
      <Link
					linkType={linkType}
					id={id}
					{...props}
				/>
    )
  }
}
