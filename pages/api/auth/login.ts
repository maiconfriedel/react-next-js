import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default function login(req: NextApiRequest, res: NextApiResponse) {
  const token = jwt.sign(req.body, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const refreshToken = jwt.sign(req.body, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  return res.json({
    user: {
      email: req.body.email,
      name: req.body.email.split("@")[0],
    },
    access_token: token,
    refresh_token: refreshToken,
  });
}
