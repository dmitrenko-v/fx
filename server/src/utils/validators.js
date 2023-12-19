module.exports = {
  validateNewUser(firstName, lastName, userName, email, password) {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
    const userNameRegex = /^[a-zA-Z]{1,20}$/;
    const nameRegex = /^[a-zA-Z]{1,30}$/;
    const passwordRegex = /^.{7,20}$/;
    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !userName ||
      !emailRegex.test(email) ||
      !nameRegex.test(firstName) ||
      !userNameRegex.test(userName) ||
      !nameRegex.test(lastName) ||
      !passwordRegex.test(password)
    ) {
      return false;
    }
    return true;
  },
};
