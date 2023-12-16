import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "./authApiSlice.js";
import { useDispatch } from "react-redux";
import { setUser } from "./authSlice.js";
import Spinner from "../../components/Spinner.jsx";
import {
  emailConfig,
  firstNameConfig,
  passwordConfig,
  lastNameConfig,
  userNameConfig,
} from "./registerFormValidation.js";

import { errorMessages } from "./validationErrors.jsx";

export default function RegisterForm() {
  const [errorMsg, setErrorMsg] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", criteriaMode: "all" });
  const dispatch = useDispatch();
  const [registerUser, { isLoading, isSuccess }] = useRegisterMutation();

  const onSubmit = async function (data) {
    try {
      await registerUser(data);
      delete data.password;
      dispatch(setUser(data));
    } catch (err) {
      setErrorMsg(err.data.error);
    }
  };

  if (isLoading) return <Spinner />;
  if (isSuccess) return <p>Your account is successfully created</p>;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Email address"
        type="email"
        className={"modal__input " + (errors.email ? "invalid-field" : "")}
        {...register("email", emailConfig)}
      />
      {errorMessages(errors, "email")}

      <input
        placeholder="Name"
        type="text"
        className={"modal__input " + (errors.firstName ? "invalid-field" : "")}
        {...register("firstName", firstNameConfig)}
      />
      {errorMessages(errors, "firstName")}

      <input
        placeholder="Last Name"
        type="text"
        className={"modal__input " + (errors.lastName ? "invalid-field" : "")}
        {...register("lastName", lastNameConfig)}
      />
      {errorMessages(errors, "lastName")}

      <input
        placeholder="Username"
        type="text"
        className={"modal__input " + (errors.userName ? "invalid-field" : "")}
        {...register("userName", userNameConfig)}
      />
      {errorMessages(errors, "userName")}

      <input
        type="password"
        placeholder="Password"
        className={"modal__input " + (errors.password ? "invalid-field" : "")}
        {...register("password", passwordConfig)}
      />
      {errorMessages(errors, "password")}
      {errorMsg && <p className="field-error-message">{errorMsg}</p>}
      <input className="modal__submit" type="submit" value="Submit" />
    </form>
  );
}
