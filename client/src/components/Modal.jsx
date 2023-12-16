import close from "../assets/close.svg";
import LoginForm from "../features/auth/LoginForm";
import RegisterForm from "../features/auth/RegisterForm";

export default function Modal({ setIsOpen, modalType }) {
  let headerText;
  let form;
  let bottomText;

  if (modalType === "login") {
    headerText = "Log in";
    form = <LoginForm />;
    bottomText = (
      <p className="modal__bottom-text">
        First time using FX?{" "}
        <a onClick={() => setIsOpen("register")}>Create an account</a>
      </p>
    );
  }

  if (modalType === "register") {
    headerText = "Register";
    form = <RegisterForm />;
    bottomText = (
      <p className="modal__bottom-text">
        Already have an account?{" "}
        <a onClick={() => setIsOpen("login")}>Click here to login</a>
      </p>
    );
  }
  return (
    <div className="darkBG">
      <div className="modal">
        <div className="modal-header">
          <h3>{headerText}</h3>
          <img
            style={{ cursor: "pointer" }}
            onClick={() => setIsOpen(null)}
            src={close}
          />
        </div>
        {form}
        {bottomText}
      </div>
    </div>
  );
}
