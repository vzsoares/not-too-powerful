import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE } from '../../env';

interface RefreshTokenResult {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

interface authRes {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}
interface userRes {
  name: string;
  id: string;
}
interface GetTokenResult {
  auth: authRes;
  user: userRes;
}

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE}/`,
  }),
  reducerPath: 'auth-api',
  tagTypes: [],
  endpoints: (build) => ({
    getToken: build.query<API_RESULT<GetTokenResult>, string>({
      query: (code) => ({
        url: 'api/v1/auth/d/userToken',
        method: 'POST',
        body: { code },
      }),
    }),
    refreshToken: build.query<API_RESULT<RefreshTokenResult>, string>({
      query: (refreshToken) => ({
        url: 'api/v1/auth/d/refreshToken',
        method: 'POST',
        body: { refresh_token: refreshToken },
      }),
    }),
  }),
});
// TODO identify user

export const { useLazyGetTokenQuery } = authApi;

interface API_RESULT<T> {
  data: T;
  message: string | null;
  code: string | null;
  error: string | null;
}
