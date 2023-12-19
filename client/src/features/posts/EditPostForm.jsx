import { useForm } from "react-hook-form";
import { useEditPostMutation } from "./postsApiSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function EditPostForm({ post, userId }) {
  const [errMsg, setErrMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [editPost] = useEditPostMutation();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { text } = data;
    try {
      await editPost({ postId: post.id, text, userId }).unwrap();
      navigate(`/post/${post.id}`);
    } catch (err) {
      console.log(err);
      setErrMsg(err.data.error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="edit-post-form">
      <textarea
        className="edit-post-form__input"
        type="text"
        placeholder="Enter post text"
        defaultValue={post.text}
        {...register("text", {
          required: {
            value: true,
            message: "Post can not be empty",
          },
          maxLength: {
            value: 500,
            message: "Post can not be longer than 500 characters",
          },
        })}
      />
      {errors.text && (
        <p className="field-error-message">{errors.text.message}</p>
      )}
      {errMsg && <p className="field-error-message">{errMsg}</p>}
      <input className="edit-post-form__submit" type="submit" value="Edit" />
    </form>
  );
}
