module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert("Posts", [
      {
        text: "First day on FX!",
        datePosted: new Date(),
        userId: 1,
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete("Posts");
  },
};
