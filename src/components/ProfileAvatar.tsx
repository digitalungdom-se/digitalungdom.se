import Avatar from '@material-ui/core/Avatar';
import { HashedBotIdenticon } from '@digitalungdom/bot-identicon';
import React from 'react';

interface ProfileAvatarProps {
  width?: number;
  height?: number;
  className?: string;
  src?: string;
  srcParams?: string;
}

export default function ProfileAvatar(props: ProfileAvatarProps) {
  return (
    <Avatar className={props.className} src={`${props.src}?${props.srcParams}`}>
      <HashedBotIdenticon background identifier={props.src} size="inherit" />
    </Avatar>
  );
}
