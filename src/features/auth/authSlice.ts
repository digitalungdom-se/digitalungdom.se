import { RootState } from 'app/store';
import { createSlice } from '@reduxjs/toolkit';

interface Details {
  _id: string;
}

export interface AuthState {
  details: Details | null;
  authenticated: boolean;
}

const initialState: AuthState = {
  authenticated: false,
  details: null,
};

export const auth = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    authorize: (state, action): void => {
      state.authenticated = true;
      state.details = action.payload.details;
    },
    failAuthorize: (state): void => {
      state.authenticated = false;
      state.details = null;
    },
  },
});

export const { authorize, failAuthorize } = auth.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.auth.authenticated)`
export const selectAuthenticated = (state: RootState): boolean => state.auth.authenticated;

export const selectMyProfile = (state: RootState): any => state.auth.details;

export default auth.reducer;
