const {
  getPostsService,
  createPostService,
  deletePostService,
  editPostService,
  getPostService,
  createCommentService,
} = require("../service/postsService");

module.exports = {
  async getPosts(req, res) {
    try {
      const posts = await getPostsService();

      return res.status(200).json(posts);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async getPost(req, res) {
    try {
      const postId = req.params.id;
      const post = await getPostService(postId);

      if (!post) return res.status(404).json({ error: "Post not found" });

      return res.status(200).json(post);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async createPost(req, res) {
    try {
      const { text } = req.body;

      if (text.length === 0)
        return res.status(400).json({ error: "Post text can not be empty" });

      if (text.length > 500)
        return res
          .status(400)
          .json({ error: "Post text must be no longer than 500 characters" });

      const newPost = await createPostService(req.body);

      return res.status(200).json(newPost);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async editPost(req, res) {
    try {
      const postId = req.params.id;
      const { text } = req.body;

      const userId = req.user.id;

      const post = await getPostService(postId);

      if (post.user.id != userId) return res.sendStatus(401);

      if (text.length === 0)
        return res.status(400).json({ error: "Post text can not be empty" });

      if (text.length > 500)
        return res
          .status(400)
          .json({ error: "Post text must be no longer than 500 characters" });

      const editedPost = await editPostService(postId, text);

      return res.status(200).json(editedPost);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async deletePost(req, res) {
    try {
      const postId = req.params.id;
      const userId = req.user.id;

      const post = await getPostService(postId);

      if (post.user.id != userId) return res.sendStatus(401);

      await deletePostService(postId);

      return res.status(200).json({ result: "Post deleted successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async createComment(req, res) {
    try {
      const postId = req.params.id;
      const { userId, text } = req.body;
      const post = await getPostService(postId);

      if (!post) return res.status(404).json({ error: "Post not found" });

      if (text.length === 0)
        return res.status(400).json({ error: "Comment can not be empty" });

      if (text.length > 100)
        return res
          .status(400)
          .json({ error: "Comment can be on longer than 100 characters" });

      const comment = createCommentService(postId, text, userId);
      return res.status(200).json(comment);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};
