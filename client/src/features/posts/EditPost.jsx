import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useGetPostQuery } from "./postsApiSlice";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Modal from "../../components/Modal";
import Spinner from "../../components/Spinner";
import EditPostForm from "./EditPostForm";

export default function EditPost() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const user = useSelector(selectCurrentUser);

  const { postId } = useParams();

  const {
    data: post = { comments: [] },
    isLoading,
    isSuccess,
  } = useGetPostQuery(postId);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.id != post.user.id) {
      navigate("/");
    }
  });

  if (isLoading) return <Spinner />;

  if (isSuccess) {
    return (
      <div className="content-container">
        <h3>Edit post</h3>
        <EditPostForm post={post} userId={user.id} />
        <button
          onClick={() => setIsOpenModal(true)}
          className="edit-post-form__delete"
        >
          Delete
        </button>
        {isOpenModal && (
          <Modal
            setIsOpen={setIsOpenModal}
            modalType={"delete"}
            deletePostId={postId}
          />
        )}
      </div>
    );
  }
}
