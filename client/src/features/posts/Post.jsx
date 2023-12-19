import postedTimeAgo from "./postedTimeAgo";
import { useNavigate } from "react-router-dom";
import comments from "../../../assets/comments.svg";
import LinkToUser from "../users/LinkToUser";
export default function Post({ post, user }) {
  const navigate = useNavigate();
  const { text, datePosted, id: postId } = post;
  const { userName, id } = user;
  const timeAgo = postedTimeAgo(datePosted);

  const onPostClick = () => {
    navigate(`post/${postId}`);
  };

  return (
    <article onClick={onPostClick} className="post">
      <div className="post__header">
        <LinkToUser userId={id} userName={userName} />{" "}
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
