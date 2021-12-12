declare namespace Express {
  export interface Request {
    auth: {
      dbId: string;
      userId: string;
      email: string;
    };
  }
}
