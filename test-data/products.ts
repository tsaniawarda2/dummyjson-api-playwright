export const productData = {
  valid: {
    request: {
      id: 3,
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
      message: "Product with id '9999' not found",
    },
  },
  params: {
    limit: 2,
    skip: 10,
    select: "title,category",
  },
  keyword: {
    valid: "makeup",
    invalid: "loremipsum",
  },
};
