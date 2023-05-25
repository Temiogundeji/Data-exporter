import User from "../../src/models/User";

declare namespace Express {
  interface Request {
    user?: keyof typeof User;
    protocol: string;
  }
}
