import dotenv from "dotenv";

dotenv.config();

export let MONGO_URI = `mongodb://${
  process.env.MONGO_USERNAME
}:${encodeURIComponent(process.env.MONGO_PASSWORD)}@${process.env.MONGO_HOST}:${
  process.env.MONGO_PORT
}/${process.env.MONGO_DATABASE}?authSource=${process.env.MONGO_AUTHSOURCE}`;

if (process.env.MONGO_URI) {
  MONGO_URI = process.env.MONGO_URI;
}

export const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};
