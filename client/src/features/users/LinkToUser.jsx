import { Link } from "react-router-dom";
export default function LinkToUser({ userId, userName }) {
  return (
    <Link
      onClick={(e) => e.stopPropagation()}
      className="post__author-ref"
      to={`/user/${userId}`}
    >
      @{userName}
    </Link>
  );
}
