import { useForm } from "react-hook-form";
import { useCreateCommentMutation } from "./postsApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";

export default function CommentForm({ postId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const userId = useSelector(selectCurrentUser).id;
  const [createComment] = useCreateCommentMutation();

  const onSubmit = async (data) => {
    const { comment: text } = data;
    await createComment({ text, userId, postId });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="comment-form">
      <input
        className="comment-form__input"
        type="text"
        placeholder="Post your reply"
        {...register("comment", {
          maxLength: {
            value: 100,
            message: "Comment can not be longer than 100 characters",
          },
          required: {
            value: true,
            message: "Comment can not be empty",
          },
        })}
      />
      <input
        className="comment-form__submit"
        type="submit"
        value="Reply"
      ></input>
      {errors.comment && (
        <p className="field-error-message">{errors.comment.message}</p>
      )}
    </form>
  );
}
