import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  name: string;
}

interface UserState {
  user?: User;
  token: string;
}

const initialState: UserState = {
  user: undefined,
  token: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | undefined>) => {
      state.user = action.payload;
    },
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>,
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
});

export const { setUser, setAuthToken, setCredentials } = userSlice.actions;

export default userSlice.reducer;
