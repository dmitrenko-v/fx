const { User } = require("../models");

module.exports = {
  getUsersService() {},
  async getUserService(id) {
    const user = await User.findByPk(id);
    return user;
  },
  getUserPostsService() {},
};
