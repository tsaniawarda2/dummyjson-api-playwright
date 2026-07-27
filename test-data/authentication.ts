export const loginData = {
  valid: {
    request: {
      username: "emilys",
      password: "emilyspass",
    },
    expected: {
      status: 200,
      username: "emilys",
    },
  },
  invalidUsername: {
    request: {
      username: "invalid-username",
      password: "emilyspass",
    },
  },
  invalidPassword: {
    request: {
      username: "emilys",
      password: "invalid-password",
    },
  },

  invalidCredentials: {
    expected: {
      status: 400,
      message: "Invalid credentials",
    },
  },

  withoutUsername: {
    request: {
      username: "",
      password: "emilyspass",
    },
  },
  withoutPassword: {
    request: {
      username: "emilys",
      password: "",
    },
  },
  emptyBody: {
    request: {},
  },
  required: {
    expected: {
      status: 400,
      message: "Username and password required",
    },
  },
};
