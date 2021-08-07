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

export const admin = async (req, res, next) => {
  try {
    const time = new Date();

    const { token, reqEmail } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });

    const { email, name } = ticket.getPayload();

    if (email !== reqEmail) {
      return res.status(400).json({ message: "Bad request" });
    }

    const admin = await userModel.findOne({ email: reqEmail, admin: true });

    if (!admin) {
      return res.status(401).json({ message: "You are not an admin" });
    }

    next();
  } catch (err) {
    if (err.message.startsWith("Invalid token signature:")) {
      console.log("Invalid token");
      res.status(401).json({ message: "Invalid token" });
    }
    console.log(err);
  }
};
