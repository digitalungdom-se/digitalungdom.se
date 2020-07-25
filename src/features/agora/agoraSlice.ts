import { Agoragram, AsteriResponseWithID } from './agoraTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from 'app/store';

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
    editAgoragramSuccess(state, action): void {
      const agoragram = state.agoragrams[action.payload._id];
      state.agoragrams[action.payload._id] = { ...agoragram, ...action.payload.edited };
      if (agoragram.children.length === 0) {
        state.agoragrams[agoragram.replyTo].children = state.agoragrams[agoragram.replyTo].children.filter(
          (child) => child._id !== action.payload._id,
        );
      }
    },
    getAgoragramsSuccess(state, action): void {
      action.payload.agoragrams.forEach(
        (agoragram: Agoragram) =>
          (state.agoragrams[agoragram._id] = { ...state.agoragrams[agoragram._id], ...agoragram }),
      );
      action.payload.starredAgoragrams?.forEach((_id: string) => (state.agoragrams[_id].isStarred = true));
    },
    newCommentSuccess(state, action) {
      state.agoragrams[action.payload.replyTo].children.unshift({ _id: action.payload._id, stars: 0 });
      state.agoragrams[action.payload._id] = action.payload;
    },
    starAgoragramSuccess(state, action: PayloadAction<AsteriResponseWithID>): void {
      state.agoragrams[action.payload.agoragramID].stars += action.payload.action === 'STARRED' ? 1 : -1;
      state.agoragrams[action.payload.agoragramID].isStarred = action.payload.action === 'STARRED' ? true : false;
    },
  },
});

export const { editAgoragramSuccess, getAgoragramsSuccess, starAgoragramSuccess, newCommentSuccess } = agora.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.auth.authenticated)`
export const selectAgoragramById = (state: RootState, id: string): Agoragram => state.agora.agoragrams[id];

export default agora.reducer;
