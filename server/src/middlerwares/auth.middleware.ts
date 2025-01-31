import { Request, Response } from "express";
import { asyncHandler } from "../utills/async-handler";
import { ApiError } from "../utills/common-handlers";
import jwt from "jsonwebtoken";
import { IUser, UserModel } from "../models/user-model";
import { Types } from "mongoose";

interface TokenPayload {
  _id: Types.ObjectId;
  email: string;
  userName: string;
}

export const verifyToken = asyncHandler(
  async (req: Request, res: Response, next) => {
    const token =
      // req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      console.log("here1");
      return res.status(401).json(new ApiError("Unauthorized request!"));
    }

    let decodedToken: TokenPayload | null = null;
    try {
      decodedToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_KEY as string
      ) as TokenPayload;
    } catch (error) {
      console.log("here2", error);
      return res.status(401).json(new ApiError("Invalid access token"));
    }
    const user = await UserModel.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      console.log("here3");
      return res.status(401).json(new ApiError("Invalid access token"));
    }

    req.user = { id: user?._id, userName: user?.userName };
    next();
  }
);
