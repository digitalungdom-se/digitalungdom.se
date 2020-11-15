import { AgoraBodyFieldProps } from './AgoraBodyField';
import { Details } from 'features/users/userTypes';

interface AgoragramChild {
  agoragram: string;
  stars: number;
}

export interface Agoragram {
  _id: string;
  body: string;
  type: 'TEXT' | 'LINK';
  title: string;
  author?: AgoragramAuthor;
  stars: number;
  commentAmount: number;
  starred: boolean;
  hypagora: string;
  shortID: string;
  children: AgoragramChild[];
  replyTo: string;
  tags?: string[];
  modified?: string;
}

export interface AgoragramAuthor {
  _id: string;
  details: Details;
}

interface AgoragramLoadedComponentProps
  extends AgoraBodyFieldProps,
    Partial<Pick<Agoragram, 'hypagora' | 'replyTo'>>,
    Omit<Agoragram, 'author' | 'children' | 'shortID' | '_id' | 'replyTo' | 'hypagora'> {
  author?: React.ReactNode;
  children?: React.ReactNode;
  time: Date;
  loading?: false;
  link?: string;
  handleStarring?: () => boolean;
  handleDelete?: () => void;
  handleReport?: () => void;
  isAuthor?: boolean;
  longPostIsFadedOut?: boolean;
}

interface AgoragramLoadingComponentProps extends Partial<Omit<AgoragramLoadedComponentProps, 'loading'>> {
  loading?: true;
}

export type AgoragramComponentProps = AgoragramLoadedComponentProps | AgoragramLoadingComponentProps;

export interface AsteriResponseWithID {
  action: 'STARRED' | 'UNSTARRED';
  agoragramID: string;
}
