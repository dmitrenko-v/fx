import { useGetPostsQuery } from "./postsApiSlice";
import { useMemo } from "react";
import Post from "./Post";
import Spinner from "../../components/Spinner";
import PostForm from "./CreatePostForm";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";

export default function Posts() {
  const { data: posts = [], isLoading, isSuccess } = useGetPostsQuery();

  const user = useSelector(selectCurrentUser);

  const sortedPosts = useMemo(() => {
    const sortedPosts = posts.slice();
    sortedPosts.sort((a, b) => b.datePosted.localeCompare(a.datePosted));
    return sortedPosts;
  }, [posts]);
  if (isLoading) return <Spinner />;

  if (isSuccess) {
    return (
      <div className="content-container">
        {user && <PostForm />}
        <div className="posts">
          {sortedPosts.map((post) => (
            <Post key={post.id} post={post} user={post.user} />
          ))}
        </div>
      </div>
    );
  }
}
