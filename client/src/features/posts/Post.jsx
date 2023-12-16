import postedTimeAgo from "./postedTimeAgo";
import { useNavigate } from "react-router-dom";
import comments from "../../assets/comments.svg";

export default function Post({ post }) {
  const navigate = useNavigate();
  const { text, datePosted, id: postId } = post;
  const { userName } = post.user;
  const timeAgo = postedTimeAgo(datePosted);

  const onPostClick = () => {
    navigate(`post/${postId}`);
  };
  return (
    <article onClick={onPostClick} className="post">
      <div className="post__header">
        <a className="post__author-ref">@{userName}</a>{" "}
        <span className="post__timeago">{timeAgo} ago</span>
      </div>
      <div className="post__content">
        <p className="post__text">{text}</p>
      </div>
      <div className="post__additional-info">
        <span className="post__comments">
          <img src={comments} />
          {post.comments.length}
        </span>
      </div>
    </article>
  );
}
