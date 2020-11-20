export interface UserNotification {
  _id: string;
  at: Date;
  data?: CommentNotificationData | any;
  read: boolean;
  type: UserNotificationTypes;
}

export interface CommentNotificationData {
  post: string;
  comment: string;
}

export type UserNotificationTypes = 'COMMENT_ON_COMMENT' | string;
