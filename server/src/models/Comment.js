const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      this.belongsTo(models.Post, { foreignKey: "postId", as: "post" });
    }
  }
  Comment.init(
    {
      text: DataTypes.STRING(100),
      datePosted: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Comment",
      timestamps: false,
    },
  );
  return Comment;
};
