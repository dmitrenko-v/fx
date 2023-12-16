const { Post, User, Comment } = require("../models");

const postIncludeUserComments = [
  {
    model: User,
    attributes: ["id", "userName"],
    as: "user",
  },
  {
    model: Comment,
    as: "comments",
    attributes: { exclude: ["postId", "id", "userId"] },
    include: {
      model: User,
      attributes: ["id", "userName"],
      as: "user",
    },
  },
];

module.exports = {
  async getPostsService() {
    const posts = await Post.findAll({
      include: postIncludeUserComments,
      attributes: { exclude: ["userId"] },
    });
    return posts;
  },

  async getPostService(postId) {
    const post = await Post.findByPk(postId, {
      include: postIncludeUserComments,
      attributes: { exclude: ["userId"] },
    });
    return post;
  },

  async createPostService(data) {
    const { text, userId } = data;

    const newPost = await Post.create({
      text,
      datePosted: new Date(),
      userId,
    });
    return newPost;
  },

  async editPostService(postId, text) {
    const post = await Post.findByPk(postId);
    post.text = text;
    await post.save();
    return post;
  },

  async deletePostService(postId) {
    await Post.destroy({ where: { id: postId } });
  },

  async createCommentService(postId, text, userId) {
    const comment = await Comment.create({
      postId,
      text,
      userId,
      datePosted: new Date(),
    });

    return comment;
  },
};
