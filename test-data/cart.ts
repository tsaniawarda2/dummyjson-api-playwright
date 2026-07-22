export const cartData = {
  valid: {
    id: 4,
  },
  addCart: {
    userId: 1,
    products: [
      {
        id: 101,
        quantity: 11,
      },
    ],
  },
  invalidAddCart: {
    userId: 9999,
    products: [
      {
        id: 101,
        quantity: 11,
      },
    ],
    message: "User with id '9999' not found",
  },
  invalid: {
    id: 9999,
    messageInvalidCartId: "Cart with id '9999' not found",
    messageInvalidUserId: "User with id '9999' not found",
  },
  params: {
    limit: 2,
    skip: 5,
  },
};
