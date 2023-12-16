import "./index.css";
import Navbar from "./components/Navbar";
import Posts from "./features/posts/Posts";
import Sidebar from "./components/Sidebar";
import PostPage from "./features/posts/PostPage";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route index element={<Posts />} />
        <Route path="post/:postId" element={<PostPage />} />
      </Routes>
      <Sidebar />
    </>
  );
}

export default App;
