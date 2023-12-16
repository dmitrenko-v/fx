module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert("Users", [
      {
        firstName: "Walter",
        lastName: "White",
        userName: "walterwhite",
        email: "heisenberg@gmail.com",
        password: "123",
      },
      {
        firstName: "Jesse",
        lastName: "Pinkman",
        userName: "cook123",
        email: "cook@gmail.com",
        password: "456",
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete("Users");
  },
};
