import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { getPostComments } from '../../api/comments';

type CommentType = {
  loaded: boolean;
  hasError: string;
  items: Comment[] | [];
};

const initialState: CommentType = {
  loaded: false,
  hasError: '',
  items: [],
};

export const init = createAsyncThunk('post/fetch', (postId: number) =>
  getPostComments(postId),
);

export const { reducer, actions } = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    addComment: (state, action) => ({
      ...state,
      items: [...state.items, action.payload],
    }),

    deleteComment: (state, action) => ({
      ...state,
      items: state.items.filter(item => item.id !== action.payload),
    }),

    setError: state => ({
      ...state,
      hasError: 'error',
    }),
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => ({
      ...state,
      loaded: false,
    }));
    builder.addCase(init.fulfilled, (state, action) => ({
      ...state,
      items: action.payload,
      loaded: true,
    }));
    builder.addCase(init.rejected, state => ({
      ...state,
      loaded: true,
      hasError: 'error',
    }));
  },
});
