import jwt from "jsonwebtoken";

const generateToken = (id, remember) => {
  if (remember) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  } else {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });
  }
};
export default generateToken;
