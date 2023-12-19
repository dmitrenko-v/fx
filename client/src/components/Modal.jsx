import close from "../../assets/close.svg";
import LoginForm from "../features/auth/LoginForm";
import RegisterForm from "../features/auth/RegisterForm";
import DeletePost from "../features/posts/DeletePost";

export default function Modal({ setIsOpen, modalType, deletePostId = null }) {
  let headerText;
  let content;
  let bottomText;

  if (modalType === "login") {
    headerText = "Log in";
    content = <LoginForm />;
    bottomText = (
      <p className="modal__bottom-text">
        First time using FX?{" "}
        <a onClick={() => setIsOpen("register")}>Create an account</a>
      </p>
    );
  }

  if (modalType === "register") {
    headerText = "Register";
    content = <RegisterForm />;
    bottomText = (
      <p className="modal__bottom-text">
        Already have an account?{" "}
        <a onClick={() => setIsOpen("login")}>Click here to login</a>
      </p>
    );
  }

  if (modalType === "delete") {
    headerText = "Are you sure you want to delete post?";
    content = <DeletePost setIsOpen={setIsOpen} deletePostId={deletePostId} />;
    bottomText = "";
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
        {content}
        {bottomText}
      </div>
    </div>
  );
}
