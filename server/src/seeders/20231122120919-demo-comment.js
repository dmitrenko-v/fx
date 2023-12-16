module.exports = {
  async up(queryInterface) {
    queryInterface.bulkInsert("Comments", [
      {
        text: "Wow",
        datePosted: new Date(),
        userId: 2,
        postId: 1,
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete("Comments");
  },
};
