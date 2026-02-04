import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type UserState = {
  posts: Post[];
  items: boolean;
  hasError: boolean;
};

const initialState: UserState = {
  posts: [],
  items: false,
  hasError: false,
};

export const init = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

export const { reducer, actions } = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => ({
      ...state,
      posts: action.payload,
    }),
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => ({
      ...state,
      items: true,
    }));

    builder.addCase(init.fulfilled, (state, action) => ({
      ...state,
      posts: action.payload,
      items: false,
    }));

    builder.addCase(init.rejected, state => ({
      ...state,
      items: false,
      hasError: true,
    }));
  },
});
