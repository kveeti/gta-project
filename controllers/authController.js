import { OAuth2Client } from "google-auth-library";
import { logIn, logOut } from "../auth";
import { userModel } from "../models";

const client = new OAuth2Client(process.env.G_CLIENT_ID);

export const login = async (req, res, next) => {
  try {
    const time = new Date();

    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    const { email, name } = ticket.getPayload();

    await userModel.findOneAndUpdate(
      { email: email },
      { $set: { email, name } },
      { upsert: true, new: true, fields: { email: 1, name: 1, _id: 1 } },
      (err, doc) => {
        if (err) {
          return res.status(500);
        }

        logIn(req, doc._id);

        console.log(
          `\n@ ${time.toLocaleDateString()} - ${time.toLocaleTimeString()}\n  LOGIN\n    ${email}\n    ${name}`
        );

        res.status(201).json({ message: "OK" });
      }
    );
  } catch (err) {
    if (err.message.startsWith("Invalid token signature:")) {
      console.log("Invalid token");
      res.status(401).json({ message: "Invalid token" });
    }
    console.log(err);
  }
};

export const logout = async (req, res, next) => {
  const time = new Date();

  if (!req.session.userId)
    return res.status(200).json({ message: "You weren't logged in" });

  await logOut(req, res);
};

export const checkLogin = async (req, res, next) => {
  res.status(201).json({ message: "OK" });
};
