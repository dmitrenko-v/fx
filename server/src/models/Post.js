const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      this.hasMany(models.Comment, {
        foreignKey: "postId",
        as: "comments",
        onDelete: "cascade",
        hooks: true,
      });
    }
  }
  Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      text: DataTypes.STRING(500),
      datePosted: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Post",
      timestamps: false,
    },
  );
  return Post;
};
