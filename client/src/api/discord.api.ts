import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE } from '../../env';

import { authenticationHeader } from './utils/headers';

export interface GuildSummary {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: number;
  features: string[];
  permissions_new: string;
}

export const discordApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE}/`,
    prepareHeaders: authenticationHeader,
  }),
  reducerPath: 'discord-api',
  tagTypes: [],
  endpoints: (build) => ({
    getGuildMatches: build.query<API_RESULT<GuildSummary[]>, undefined>({
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

export const { useGetGuildMatchesQuery, useGetGuildChannelsQuery } = discordApi;

interface API_RESULT<T> {
  data: T;
  message: string | null;
  code: string | null;
  error: string | null;
}
