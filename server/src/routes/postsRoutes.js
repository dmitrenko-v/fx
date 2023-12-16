const express = require("express");
const {
  getPosts,
  getPost,
  createPost,
  deletePost,
  editPost,
  createComment,
} = require("../controllers/postsController");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", verifyJWT, createPost);
router.delete("/:id", verifyJWT, deletePost);
router.patch("/:id", verifyJWT, editPost);

router.post("/:id/comments", verifyJWT, createComment);

module.exports = router;
