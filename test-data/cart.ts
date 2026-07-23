export const cartData = {
  valid: {
    id: 4,
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
  addCart: {
    userId: 1,
    products: [
      {
        id: 101,
        quantity: 11,
      },
    ],
  },
  failedAddCart: {
    userId: 1000,
    products: [
      {
        id: 101,
        quantity: 11,
      },
    ],
    messageInvalidUserId: "User with id '1000' not found",
    messageEmptyBody: "User id is required",
  },
  updateCart: {
    products: [
      {
        id: 101,
        quantity: 5,
      },
    ],
  },
  updateCartMergeTrue: {
    merge: true,
    products: [
      {
        id: 101,
        quantity: 5,
      },
    ],
  },
};
