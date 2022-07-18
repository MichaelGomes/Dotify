import jwt from "jsonwebtoken";

const generateResetToken = (id) => {
  //Expires in 10 Minutes
  return jwt.sign({ id }, process.env.RESET_SECRET, {
    expiresIn: 600,
  });
};

export default generateResetToken;
