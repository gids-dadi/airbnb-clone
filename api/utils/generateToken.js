import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);

  res.cookie("jwtCookie", token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    // sameSite: "none", // Prevent CSRF attacks
    maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
  });
};

export default generateToken;
 