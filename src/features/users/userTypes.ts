export interface User {
  _id: string;
  details: Details;
  agora: {
    profile: Profile;
  };
}

export interface Details {
  firstName: string;
  lastName: string;
  username: string;
  birthdate: Date;
  email: {
    raw: string;
    normalised: string;
  };
  gender: 'MALE' | 'FEMALE' | 'OTHER' | 'UNDISCLOSED';
}

export interface Profile {
  bio?: string;
  url?: string;
  status?: string;
}
