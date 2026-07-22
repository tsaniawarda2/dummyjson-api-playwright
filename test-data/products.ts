export const productData = {
  valid: {
    id: 3,
  },
  invalid: {
    id: 9999,
    message: "Product with id '9999' not found"
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
