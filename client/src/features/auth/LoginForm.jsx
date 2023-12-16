import { useState } from "react";
import { useLoginMutation } from "./authApiSlice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUser } from "./authSlice.js";
import Spinner from "../../components/Spinner.jsx";
export default function LoginForm() {
  const [errorMsg, setErrorMsg] = useState("");
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const [loginUser, { isLoading, isSuccess }] = useLoginMutation();

  if (isLoading) return <Spinner />;
  if (isSuccess) return <p>Logged in successfully</p>;
  const onSubmit = async function (data) {
    try {
      const user = await loginUser(data).unwrap();
      dispatch(setUser(user));
    } catch (err) {
      setErrorMsg(err.data.error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        className="modal__input"
        type="email"
        placeholder="Email address"
        {...register("email")}
      />
      <input
        className="modal__input"
        type="password"
        placeholder="Password"
        {...register("password")}
      />
      <input className="modal__submit" type="submit" value="Submit" />
      {errorMsg && <p className="field-error-message">{errorMsg}</p>}
    </form>
  );
}
