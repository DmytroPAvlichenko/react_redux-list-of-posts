import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

const initialState: Post | null = null;

export const { reducer, actions } = createSlice<Post | null>({
  name: 'selectPost',
  initialState,
  reducers: {
    setSelected: (_post, action: PayloadAction<Post | null>) => action.payload,
  },
});
