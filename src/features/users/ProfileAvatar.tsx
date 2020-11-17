import Avatar from '@material-ui/core/Avatar';
import React from 'react';

interface ProfileAvatarProps {
  userID?: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function ProfileAvatar(props: ProfileAvatarProps) {
  return (
    <Avatar
      className={props.className}
      src={`/user/${props.userID}/profile_picture?size=${props.width || props.height}`}
    />
  );
}
