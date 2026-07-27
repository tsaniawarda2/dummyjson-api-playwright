export const userData = {
  valid: {
    request: {
      id: 1,
    },
    expected: {
      status: 200,
    },
  },
  invalid: {
    request: {
      id: 9999,
    },
    expected: {
      status: 404,
      message: "User with id '9999' not found",
    },
  },
  params: {
    limit: 2,
    skip: 5,
    select: "firstName,age",
  },

  invalidToken: {
    expected: {
      status: 401,
      message: "Invalid/Expired Token!",
    },
  },
};
