import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE } from '../../env';

import { authenticationHeader } from './utils/headers';

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE}/`,
    prepareHeaders: authenticationHeader,
  }),
  reducerPath: 'auth-api',
  tagTypes: [],
  endpoints: (build) => ({
    getGuildMatches: build.query<API_RESULT<unknown>, undefined>({
      query: () => ({
        url: 'api/v1/guilds/matches',
      }),
    }),
    getGuildChannels: build.query<API_RESULT<unknown>, undefined>({
      query: (guild_id) => ({
        url: 'api/v1/guilds/channels',
        params: { guild_id },
      }),
    }),
  }),
});
// TODO identify user

export const { useGetGuildMatchesQuery, useGetGuildChannelsQuery } = authApi;

interface API_RESULT<T> {
  data: T;
  message: string | null;
  code: string | null;
  error: string | null;
}
