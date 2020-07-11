export interface Agoragram {
  _id: string;
  body: string;
  type: 'TEXT' | 'LINK';
  title: string;
  author?: string;
  stars: number;
  commentAmmount: number;
}
