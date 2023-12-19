import { useDeletePostMutation } from "./postsApiSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";

export default function DeletePost({ setIsOpen, deletePostId }) {
  const [deletePost, { isLoading, isSuccess }] = useDeletePostMutation();

  const navigate = useNavigate();

  const user = useSelector(selectCurrentUser);
  const userId = user.id;
  const handleDelete = async () => {
    try {
      await deletePost({ postId: deletePostId, userId });
      navigate("/");
    } catch (err) {
      console.log(err);
      return <p className="field-error-message">{err.data.error}</p>;
    }
  };
  if (isLoading) return <Spinner />;
  if (isSuccess) return <p>Post successfully deleted</p>;
  return (
    <div className="modal-delete__buttons">
      <button onClick={handleDelete} className="edit-post-form__delete">
        Delete
      </button>
      <button
        onClick={() => setIsOpen(false)}
        className="edit-post-form__submit"
      >
        Cancel
      </button>
    </div>
  );
}
