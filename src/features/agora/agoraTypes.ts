import { AgoraBodyFieldProps } from './AgoraBodyField';

interface AgoragramChild {
  _id: string;
  stars: number;
}

export interface Agoragram {
  _id: string;
  body: string;
  type: 'TEXT' | 'LINK';
  title: string;
  author?: string;
  stars: number;
  commentAmount: number;
  isStarred: boolean;
  hypagora: string;
  shortID: string;
  children: AgoragramChild[];
  replyTo: string;
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
  tags?: string[];
}

interface AgoragramLoadingComponentProps extends Partial<Omit<AgoragramLoadedComponentProps, 'loading'>> {
  loading?: true;
}

export type AgoragramComponentProps = AgoragramLoadedComponentProps | AgoragramLoadingComponentProps;

export interface AsteriResponseWithID {
  action: 'STARRED' | 'UNSTARRED';
  agoragramID: string;
}
