export const emailConfig = {
  pattern: {
    value:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Invalid email address format",
  },
};

export const firstNameConfig = {
  pattern: {
    value: /^[a-zA-Z]+$/,
    message: "Name can contain only alphabet characters",
  },
  required: {
    value: true,
    message: "Name can not be empty",
  },
  maxLength: {
    value: 30,
    message: "Name must be no longer than 30 characters",
  },
};

export const lastNameConfig = {
  pattern: {
    value: /^[a-zA-Z]+$/,
    message: "Last name can contain only alphabet characters",
  },
  required: {
    value: true,
    message: "Last name can not be empty",
  },
  maxLength: {
    value: 30,
    message: "Last name must be no longer than 30 characters",
  },
};

export const passwordConfig = {
  required: {
    value: true,
    message: "Password can not be empty",
  },
  minLength: {
    value: 7,
    message: "Password must be 7 or more characters length",
  },
  maxLength: {
    value: 20,
    message: "Password can not be longer than 20 characters",
  },
};

export const userNameConfig = {
  pattern: {
    value: /^[a-zA-Z0-9\-_.]+$/,
    message: "Username can contain digits, alphabet characters, '.', '-', '_'",
  },
  required: {
    value: true,
    message: "Username can not be empty",
  },
  maxLength: {
    value: 20,
    message: "Username must be no longer than 20 characters",
  },
};
