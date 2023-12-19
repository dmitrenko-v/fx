import { apiSlice } from "../../api";
import { setUser } from "./authSlice";

export const authEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        credentials: "include",
        body: userInfo,
      }),
    }),
    login: builder.mutation({
      query: (userCredentials) => ({
        url: "/auth/login",
        method: "POST",
        credentials: "include",
        body: userCredentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
    getSession: builder.query({
      query: () => ({ url: "/auth/session", credentials: "include" }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const user = data ? data : {};
          dispatch(setUser(user));
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetSessionQuery,
} = authEndpoints;
