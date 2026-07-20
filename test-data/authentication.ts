export const loginData = {
  valid: {
    username: "emilys",
    password: "emilyspass",
  },
  invalidUsername: {
    username: "invalid-username",
    password: "emilyspass",
  },

  invalidPassword: {
    username: "emilys",
    password: "invalid-password",
  },
  withoutUsername: {
    username: "",
    password: "emilyspass",
  },
  withoutPassword: {
    username: "emilys",
    password: "",
  },
  emptyBody: {},
};
