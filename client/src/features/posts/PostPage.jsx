import { useGetPostQuery } from "./postsApiSlice";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import Spinner from "../../components/Spinner";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
import CommentForm from "./CommentForm";
import postedTimeAgo from "./postedTimeAgo";

export default function PostPage() {
  const { postId } = useParams();
  const {
    data: post = { comments: [] },
    isLoading,
    isSuccess,
  } = useGetPostQuery(postId);

  const user = useSelector(selectCurrentUser);
  const sortedComments = useMemo(() => {
    const sorteComments = post.comments.slice();
    sorteComments.sort((a, b) => b.datePosted.localeCompare(a.datePosted));
    return sorteComments;
  }, [post.comments]);

  if (isLoading) return <Spinner />;

  if (isSuccess) {
    const { datePosted, text } = post;
    const { userName } = post.user;
    const dateString = new Date(datePosted).toUTCString();

    const renderedComments = sortedComments.map((comment, index) => (
      <div key={index} className="comments__comment">
        <a className="post__author-ref">@{comment.user.userName}</a>{" "}
        <span className="post__timeago">
          {postedTimeAgo(comment.datePosted)} ago
        </span>
        <p className="comment__text">{comment.text}</p>
      </div>
    ));
    return (
      <div className="content-container">
        <div className="post-page">
          <div className="post__header">
            <a className="post__author-ref">@{userName}</a>
            <button className="post__button-edit">Edit</button>
          </div>
          <div className="post__content">
            <p className="post__text">{text}</p>
          </div>
          <p className="post__timeago">{dateString}</p>
        </div>
        {user && <CommentForm postId={postId} />}
        <div className="comments">
          <h3>Comments:</h3>
          {renderedComments}
        </div>
      </div>
    );
  }
}
