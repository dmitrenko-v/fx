import { apiSlice } from "../../api";

export const postsEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      providesTags: ["Posts"],
    }),

    getPost: builder.query({
      query: (postId) => `/posts/${postId}`,
      providesTags: ["Posts"],
    }),

    createPost: builder.mutation({
      query: (post) => ({
        url: `/posts`,
        method: "POST",
        body: post,
        credentials: "include",
      }),
      invalidatesTags: ["Posts"],
    }),

    editPost: builder.mutation({
      query: ({ postId, text, userId }) => ({
        url: `/posts/${postId}`,
        method: "PATCH",
        credentials: "include",
        body: { text, userId },
      }),
      invalidatesTags: ["Posts"],
    }),

    deletePost: builder.mutation({
      query: ({ postId, userId }) => ({
        url: `/posts/${postId}`,
        method: "DELETE",
        credentials: "include",
        body: { userId },
      }),
      invalidatesTags: ["Posts"],
    }),

    createComment: builder.mutation({
      query: (comment) => {
        return {
          url: `/posts/${comment.postId}/comments`,
          method: "POST",
          credentials: "include",
          body: { text: comment.text, userId: comment.userId },
        };
      },
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useEditPostMutation,
  useDeletePostMutation,
  useCreatePostMutation,
  useCreateCommentMutation,
} = postsEndpoints;
