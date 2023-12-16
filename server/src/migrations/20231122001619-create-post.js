module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("Posts", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      text: Sequelize.DataTypes.STRING(500),
      datePosted: Sequelize.DataTypes.DATE,
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable("Posts");
  },
};
