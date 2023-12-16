import { useState } from "react";
import house from "../assets/house.svg";
import fx from "../assets/fx.svg";
import messages from "../assets/messages.svg";
import profile from "../assets/profile.svg";
import logIn from "../assets/logIn.svg";
import Modal from "./Modal";
import { selectCurrentUser } from "../features/auth/authSlice";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "../features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  const [isOpenModal, setIsOpenModal] = useState(null);
  const [logOut] = useLogoutMutation();

  let content;

  const handleLogInClick = () => {
    setIsOpenModal("login");
  };

  const handleLogOutClick = async () => {
    await logOut();
    navigate("/");
  };

  const handleRegisterClick = () => {
    setIsOpenModal("register");
  };

  const handleHomeClick = () => {
    navigate("/");
  };
  if (user) {
    content = (
      <ul>
        <li>
          <img src={messages} />
          Messages
        </li>
        <li>
          <img src={profile} />
          Profile
        </li>{" "}
        <li onClick={handleLogOutClick}>Log out</li>
      </ul>
    );
  } else {
    content = (
      <ul>
        <li onClick={() => handleLogInClick()}>
          <img src={logIn} />
          Log in
        </li>
        <li onClick={() => handleRegisterClick()}>Sign up</li>
      </ul>
    );
  }
  return (
    <header>
      <ul>
        <li className="logo">
          <img src={fx} />
        </li>
        <li onClick={handleHomeClick} className="home">
          <img src={house} />
          Home
        </li>
      </ul>

      {content}
      {isOpenModal && (
        <Modal setIsOpen={setIsOpenModal} modalType={isOpenModal} />
      )}
    </header>
  );
}
