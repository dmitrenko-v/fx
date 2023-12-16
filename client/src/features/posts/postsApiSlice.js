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
      query: (initialPost) => ({
        url: `/posts/${initialPost.id}`,
        method: "PATCH",
        body: initialPost,
      }),
      invalidatesTags: ["Posts"],
    }),

    deletePost: builder.mutation({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: "DELETE",
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
