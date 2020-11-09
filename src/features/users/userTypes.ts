export interface User {
  _id: string;
  details: Details;
  profile: Profile;
}

export interface Details {
  name: string;
  username: string;
}

export interface Profile {
  bio?: string;
  url?: string;
  status?: string;
}
