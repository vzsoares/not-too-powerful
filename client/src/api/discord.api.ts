import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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

export interface GuildChannelSummary {
  id: string;
  type: number;
  name: string;
  position: number;
  flags: number;
  parent_id: string | null;
  guild_id: string;
  permission_overwrites: string[] | null;
}

export interface sendMessageT {
  content?: string;
  attachments: File;
  userId: string;
}

export const discordApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE ?? ''}/`,
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
    getGuildChannels: build.query<
      API_RESULT<GuildChannelSummary[]>,
      GuildSummary['id']
    >({
      query: (guild_id) => ({
        url: 'api/v1/guilds/channels',
        params: { guild_id },
      }),
    }),
    // sendMessage: build.query<API_RESULT<unknown>, FormData>({
    //   query: (body) => ({
    //     method: 'POST',
    //     url: 'api/v1/guilds/sendMessage',
    //     body,
    //   }),
    // }),
  }),
});
// TODO identify user
// TODO handle errors (log user out on 401)

export const { useGetGuildMatchesQuery, useGetGuildChannelsQuery } = discordApi;

interface API_RESULT<T> {
  data: T;
  message: string | null;
  code: string | null;
  error: string | null;
}
