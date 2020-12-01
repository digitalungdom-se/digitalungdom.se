export interface MinimumNotificationProps {
  at: Date;
  type: UserNotificationTypes;
  read?: boolean;
}

export interface UserNotification extends MinimumNotificationProps {
  data: CommentNotificationData | any;
  _id: string;
}

export interface CommentNotificationData {
  post: string;
  comment: string;
}

export type UserNotificationTypes = 'COMMENT_ON_COMMENT' | string;
