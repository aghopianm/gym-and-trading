// store/features/bodybuilders/bodybuilderSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BodybuilderData {
  likes: number;
}

interface BodybuilderState {
  entities: {
    [key: string]: BodybuilderData;
  };
}

const initialState: BodybuilderState = {
  entities: {
    "jay-cutler": { likes: 0 },
    "rich-piana": { likes: 0 },
    "ronnie-coleman": { likes: 0 }
  }
};

export const bodybuilderSlice = createSlice({
  name: 'bodybuilders',
  initialState,
  reducers: {
    incrementLikeCount: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.entities[id]) {
        state.entities[id].likes += 1;
      }
    },
  },
});

export const { incrementLikeCount } = bodybuilderSlice.actions;

export default bodybuilderSlice.reducer;