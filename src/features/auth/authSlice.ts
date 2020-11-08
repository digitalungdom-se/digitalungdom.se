import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from 'app/store';

export type AuthPage = 'LOGIN' | 'REGISTER' | 'VERIFY_EMAIL';

interface Details {
  _id: string;
  username: string;
}

interface AuthDialogOptions {
  page?: AuthPage;
  open: boolean;
}

export interface AuthState {
  details: Details | null;
  authenticated: boolean;
  dialog: AuthDialogOptions;
}

const initialState: AuthState = {
  authenticated: false,
  details: null,
  dialog: {
    open: false,
    page: 'LOGIN',
  },
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
      // state.details = null;
    },
    displayAuthDialog: (state, action: PayloadAction<AuthDialogOptions>): void => {
      state.dialog = { ...state.dialog, ...action.payload };
    },
  },
});

export const { authorize, failAuthorize, displayAuthDialog } = auth.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.auth.authenticated)`
export const selectAuthenticated = (state: RootState): boolean => state.auth.authenticated;
export const selectAuthDialog = (state: RootState): AuthDialogOptions => state.auth.dialog;

export const selectMyId = (state: RootState): string | undefined => state.auth.details?._id;

export default auth.reducer;
