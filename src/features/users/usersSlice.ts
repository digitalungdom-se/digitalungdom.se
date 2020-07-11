import { RootState } from 'app/store';
import { User } from './userTypes';
import { createSlice } from '@reduxjs/toolkit';

interface UsersState {
  users: Record<string, User>;
}

const initialState: UsersState = {
  users: {},
};

export const users = createSlice({
  initialState,
  name: 'users',
  reducers: {
    getUsersSuccess(state, action): void {
      action.payload.forEach((user: User) => (state.users[user._id] = user));
    },
  },
});

export const { getUsersSuccess } = users.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.auth.authenticated)`
export const selectUserById = (state: RootState, id: string): User => state.users.users[id];

export default users.reducer;
