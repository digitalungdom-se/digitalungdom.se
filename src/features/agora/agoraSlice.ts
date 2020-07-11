import { Agoragram } from './agoraTypes';
import { RootState } from 'app/store';
import { createSlice } from '@reduxjs/toolkit';

interface State {
  agoragrams: Record<string, Agoragram>;
}

const initialState: State = {
  agoragrams: {},
};

export const auth = createSlice({
  initialState,
  name: 'agora',
  reducers: {
    getAgoragramsSuccess(state, action) {
      action.payload.agoragrams.forEach((agoragram: Agoragram) => (state.agoragrams[agoragram._id] = agoragram));
    },
  },
});

export const { getAgoragramsSuccess } = auth.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.auth.authenticated)`
export const selectAuthenticated = (state: RootState): boolean => state.auth.authenticated;

export const selectMyProfile = (state: RootState): any => state.auth.details;

export default auth.reducer;
