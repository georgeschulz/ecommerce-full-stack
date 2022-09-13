export const endpoint =
  process.env.NODE_ENV === "production"
    ? "https://pest-control-ecommerce.herokuapp.com/"
    : "http://localhost:4000";