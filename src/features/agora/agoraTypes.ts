export interface Agoragram {
  _id: string;
  body: string;
  type: 'TEXT' | 'LINK';
  title: string;
  author?: string;
  stars: number;
  commentAmount: number;
  isStarred?: boolean;
  hypagora: string;
  shortID: string;
}

export interface AsteriResponseWithID {
  action: 'STARRED' | 'UNSTARRED';
  agoragramID: string;
}
