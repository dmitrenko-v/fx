const { User, Post, Comment } = require("../models");

module.exports = {
  async getUserService(id) {
    const user = await User.findByPk(id, {
      include: {
        model: Post,
        as: "posts",
        attributes: { exclude: "userId" },
        include: {
          model: Comment,
          as: "comments",
        },
      },
    });
    return user;
  },
};
