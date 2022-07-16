import jwt from "jsonwebtoken";

const generateEmailToken = (id) => {
  return jwt.sign({ id }, process.env.EMAIL_SECRET, {
    expiresIn: "2h",
  });
};

export default generateEmailToken;
