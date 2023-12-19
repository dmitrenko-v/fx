import { useState } from "react";
import house from "../../assets/house.svg";
import fx from "../../assets/fx.svg";
import profile from "../../assets/profile.svg";
import logIn from "../../assets/logIn.svg";
import Modal from "./Modal";
import { selectCurrentUser } from "../features/auth/authSlice";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "../features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../features/auth/authSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const [isOpenModal, setIsOpenModal] = useState(null);
  const [logOutQuery] = useLogoutMutation();

  let content;

  const handleLogOutClick = async () => {
    await logOutQuery();
    dispatch(logOut());
    navigate("/");
  };

  if (user) {
    const userId = user.id;
    content = (
      <ul>
        <li onClick={() => navigate(`/user/${userId}`)}>
          <img src={profile} />
          Profile
        </li>{" "}
        <li onClick={() => handleLogOutClick()}>Log out</li>
      </ul>
    );
  } else {
    content = (
      <ul>
        <li onClick={() => setIsOpenModal("login")}>
          <img src={logIn} />
          Log in
        </li>
        <li onClick={() => setIsOpenModal("register")}>Sign up</li>
      </ul>
    );
  }
  return (
    <header>
      <ul>
        <li className="logo">
          <img src={fx} />
        </li>
        <li onClick={() => navigate("/")} className="home">
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
