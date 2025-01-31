import * as express from "express-serve-static-core";
import { Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: Types.ObjectId;
        userName: string;
      };
    }
  }
}
