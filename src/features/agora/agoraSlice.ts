import { Agoragram } from './agoraTypes';
import { RootState } from 'app/store';
import { createSlice } from '@reduxjs/toolkit';

interface AgoraState {
  agoragrams: Record<string, Agoragram>;
}

const initialState: AgoraState = {
  agoragrams: {},
};

export const agora = createSlice({
  initialState,
  name: 'agora',
  reducers: {
    getAgoragramsSuccess(state, action): void {
      action.payload.forEach((agoragram: Agoragram) => (state.agoragrams[agoragram._id] = agoragram));
    },
  },
});

export const { getAgoragramsSuccess } = agora.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.auth.authenticated)`
export const selectAgoragramById = (state: RootState, id: string): Agoragram => state.agora.agoragrams[id];

export default agora.reducer;
