import { RootState } from 'app/store';
import { User } from './userTypes';
import { createSlice } from '@reduxjs/toolkit';

interface Details {
  _id: string;
  username: string;
}

interface UsersState {
  users: Record<string, User>;
  me: Details | null;
}

const initialState: UsersState = {
  me: null,
  users: {},
};

export const users = createSlice({
  initialState,
  name: 'users',
  reducers: {
    getUsersSuccess(state, action): void {
      action.payload.forEach((user: User) => (state.users[user._id] = { ...state.users[user._id], ...user }));
    },
    setMe(state, action): void {
      state.me = {
        _id: action.payload._id,
        username: action.payload.details.username,
      };
      state.users[action.payload._id] = { ...state.users[action.payload._id], ...action.payload };
    },
  },
});

export const { getUsersSuccess, setMe } = users.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.auth.authenticated)`
export const selectUserById = (state: RootState, id: string): User => state.users.users[id];

export const selectMyProfile = (state: RootState): User | null => {
  if (state.users.me?._id) return state.users.users[state.users.me._id];
  else return null;
};

export default users.reducer;
