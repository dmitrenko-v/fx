module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("Comments", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      text: Sequelize.DataTypes.STRING(100),
      datePosted: Sequelize.DataTypes.DATE,
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      postId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: "Posts",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable("Comments");
  },
};
