export const cartData = {
  valid: {
    cartId: 4,
    userId: 2,
  },
  invalid: {
    request: {
      cartId: 1000,
      userId: 2000,
    },
    expected: {
      status: 404,
      cartNotFound: "Cart with id '1000' not found",
      userNotFound: "User with id '2000' not found",
    },
  },
  params: {
    limit: 2,
    skip: 5,
  },

  addCart: {
    request: {
      userId: 1,
      products: [
        {
          id: 101,
          quantity: 11,
        },
      ],
    },
    expected: {
      status: 201,
    },
  },

  addCartInvalidUser: {
    request: {
      userId: 1000,
      products: [
        {
          id: 101,
          quantity: 11,
        },
      ],
    },
    expected: {
      status: 404,
      message: "User with id '1000' not found",
    },
  },

  addCartEmptyBody: {
    request: {},
    expected: {
      status: 400,
      message: "User id is required",
    },
  },

  updateCart: {
    request: {
      products: [
        {
          id: 101,
          quantity: 5,
        },
      ],
    },
    expected: {
      status: 200,
    },
  },

  updateCartMerge: {
    request: {
      merge: true,
      products: [
        {
          id: 101,
          quantity: 5,
        },
      ],
    },
    expected: {
      status: 200,
    },
  },

  updateCartEmptyBody: {
    request: {},
    expected: {
      status: 200,
    },
  },
};
