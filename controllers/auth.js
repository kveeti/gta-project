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

    const existingUser = await userModel.find({ email: email });

    if (existingUser.length > 1) {
      console.log("MORE THAN ONE MATCH ON EMAILS: ", email);
      return res.status(500).json({ message: "server error" });
    }

    if (existingUser.length) {
      logIn(req, existingUser[0]._id);

      res.status(201).json({ message: "OK" });

      return console.log(
        `\n@ ${time.toLocaleDateString()} - ${time.toLocaleTimeString()}\n  LOGIN\n    ${email}\n    ${name}`
      );
    }

    await userModel.create(
      {
        email: email,
        name: name,
        cars: [],
        garages: [],
      },
      (err, doc) => {
        if (err) return console.log("Error creating an user: ", err);

        logIn(req, doc._id);

        res.status(201).json({ message: "OK" });

        return console.log(
          `\n@ ${time.toLocaleDateString()} - ${time.toLocaleTimeString()}\n  NEW USER\n    ${email}\n    ${name}`
        );
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
