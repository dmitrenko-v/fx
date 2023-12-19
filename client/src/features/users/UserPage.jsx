import { useParams } from "react-router-dom";
import { useGetUserQuery } from "./usersApiSlice";
import { useMemo } from "react";
import Spinner from "../../components/Spinner";
import Post from "../posts/Post";

export default function UserPage() {
  const { userId } = useParams();
  const {
    data: user = { posts: [] },
    isLoading,
    isSuccess,
  } = useGetUserQuery(userId);

  const sortedPosts = useMemo(() => {
    const sortedPosts = user.posts.slice();
    sortedPosts.sort((a, b) => b.datePosted.localeCompare(a.datePosted));
    return sortedPosts;
  }, [user.posts]);

  if (isLoading) return <Spinner />;

  if (isSuccess) {
    return (
      <div className="content-container">
        <div className="user">
          <p className="user__username">@{user.userName}</p>
          <p className="user__name">
            {user.firstName} {user.lastName}
          </p>
        </div>
        <div className="user__posts">
          <h3>Posts by this user</h3>
        </div>
        {sortedPosts.map((post) => {
          return <Post key={post.id} post={post} user={user} />;
        })}
      </div>
    );
  }
}
