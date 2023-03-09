import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  name: string;
}
interface AuthOjb {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}
interface UserState {
  user?: User;
  auth?: AuthOjb;
}

const initialState: UserState = {
  user: undefined,
  auth: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | undefined>) => {
      state.user = action.payload;
    },
    setAuth: (state, action: PayloadAction<AuthOjb>) => {
      state.auth = action.payload;
    },
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; auth: AuthOjb }>,
    ) => {
      state.auth = action.payload.auth;
      state.user = action.payload.user;
    },
  },
});

export const { setUser, setCredentials, setAuth } = userSlice.actions;

export default userSlice.reducer;
