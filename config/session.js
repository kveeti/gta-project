import dotenv from "dotenv";

dotenv.config();

export const {
  SESSION_SECRET,
  SESSION_NAME,
  SESSION_ABSOLUTE_TIMEOUT = 1000 * 60 * 58, // 58 min, cause google token expires in 1 hour
  SESSION_IDLE_TIMEOUT = SESSION_ABSOLUTE_TIMEOUT,
} = process.env;

export const SESSION_OPTIONS = {
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  path: "/",
  rolling: true,
  resave: false,
  saveUninitialized: false,
  httpOnly: true, // --
  unset: "destroy",
  proxy: true, // --
  cookie: {
    maxAge: +SESSION_ABSOLUTE_TIMEOUT,
    secure: true, // --
  },
};
