import "dotenv/config";

export const port = process.env.PORT!;
export const corsOrigins = process.env.CORS_ORIGINS!.split(" ");

export const mongoUri = process.env.MONGO_URI!;
export const jwtSecret = process.env.JWT_SECRET!;
