import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

const initialState: User | null = null;

export const { reducer, actions } = createSlice<User | null>({
  name: 'selectUser',
  initialState,
  reducers: {
    setSelected: (_post, action: PayloadAction<User | null>) => action.payload,
  },
});
