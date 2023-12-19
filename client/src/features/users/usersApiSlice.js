import { apiSlice } from "../../api";

export const userEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (userId) => `/users/${userId}`,
    }),
  }),
});

export const { useGetUserQuery } = userEndpoints;
