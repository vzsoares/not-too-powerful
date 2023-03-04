import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
// TODO
export const discordAuth = createApi({
  reducerPath: 'discordAuth',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://discord.com/api/oauth2/' }),
  endpoints: (builder) => ({
    getUserToken2: builder.query<string, string>({
      query: (code) => ({
        url: `token`,
        method: 'POST',
        body: { code },
      }),
    }),
    getUserToken: builder.mutation({
      query: (code) => ({ url: `token` }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserToken2Query } = discordAuth;
