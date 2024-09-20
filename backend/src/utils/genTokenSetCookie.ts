import jwt from "jsonwebtoken";
import { config } from "../config";

const genTokenSetCookie = (res: any, user: any) => {
  const token = jwt.sign({ id: user._id }, config.jwt.secret, {
    expiresIn: "10d",
  });

  res.cookie("token", token, {
    maxAge: 1000 * 60 * 60 * 24 * 10,
    httpOnly: true,
    secure: config.env === "production",
    sameSite: config.env === "production" ? "none" : "lax",

    path: "/",
  });
  return token;
};

export default genTokenSetCookie;
