import "./index.css";
import Navbar from "./components/Navbar";
import Posts from "./features/posts/Posts";
import PostPage from "./features/posts/PostPage";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import EditPost from "./features/posts/EditPost";
import UserPage from "./features/users/UserPage";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route index element={<Posts />} />
        <Route path="post/:postId" element={<PostPage />} />
        <Route path="post/:postId/edit" element={<EditPost />} />
        <Route path="user/:userId" element={<UserPage />} />
      </Routes>
    </>
  );
}

export default App;
