//endpoints change based on the envirornment. This easily managed from a endpoint object that is exported
export const endpoint =
  process.env.NODE_ENV === "production"
    ? "https://pest-control-ecommerce.herokuapp.com"
    : "http://localhost:4000";