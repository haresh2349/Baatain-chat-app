import { Request, Response } from "express";
import { asyncHandler } from "../utills/async-handler";
import { ApiError } from "../utills/common-handlers";
import jwt from "jsonwebtoken"
import { IUser, UserModel } from "../models/user-model";
import {Types} from "mongoose"

interface CustomRequest extends Request {
    user?:IUser
}

interface TokenPayload {
    _id: Types.ObjectId;
    email: string;
    userName: string
}


export const verifyToken = asyncHandler(async (req:CustomRequest,res:Response,next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");

    if(!token) {
        throw new ApiError(401,"Unauthorized request!")
    }
    
    let decodedToken : TokenPayload | null = null;

    try {
        decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_KEY as string) as TokenPayload;
    } catch (error) {
        throw new ApiError(401, "Invalid access token");
    }


    const user = await UserModel.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    req.user = user;
    next()
})