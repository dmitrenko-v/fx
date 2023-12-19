import { useCreatePostMutation } from "./postsApiSlice";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useState } from "react";
import { selectCurrentUser } from "../auth/authSlice";
export default function PostForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [errorMsg, setErrorMsg] = useState("");

  const user = useSelector(selectCurrentUser);

  const [createPost] = useCreatePostMutation();

  const onSubmit = async (data) => {
    try {
      await createPost({ text: data.postText, userId: user.id });
    } catch (err) {
      setErrorMsg(err.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="create-post-form">
      <textarea
        spellCheck="false"
        className="create-post-form__input"
        placeholder="What's new?"
        {...register("postText", {
          required: {
            value: true,
            message: "Post can not be empty",
          },
          maxLength: {
            value: 500,
            message: "Post can not be longer than 500 characters",
          },
        })}
      ></textarea>
      <input className="create-post-form__submit" type="submit" value="Post" />
      {errors.postText && (
        <p className="field-error-message">{errors.postText.message}</p>
      )}
      {errorMsg && <p className="field-error-message">{errorMsg}</p>}
    </form>
  );
}
