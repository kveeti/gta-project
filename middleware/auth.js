import { SESSION_ABSOLUTE_TIMEOUT } from "../config";
import { userModel } from "../models";

export const loggedIn = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "You need to be logged in" });
  }

  await userModel.findById(req.session.userId, (err, user) => {
    if (err) {
      res.status(500).send();
      return console.log("user not found");
    }

    return next();
  });
};

export const active = async (req, res, next) => {
  const now = Date.now();
  const { createdAt } = req.session;

  if (now > createdAt + SESSION_ABSOLUTE_TIMEOUT) {
    return res.status(401).json({ message: "Session expired" });
  }

  next();
};
