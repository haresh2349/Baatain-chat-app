import { asyncHandler } from "../../utills/async-handler";
import { Request, Response } from "express";
import { UserModel, IUser } from "../../models/user-model";
import { ApiError, ApiResponse } from "../../utills/common-handlers";
import { Types } from "mongoose";

export const RegisterUser = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const {
      userName,
      email,
      countryCode,
      contactNumber,
      password,
    }: {
      userName: string;
      email: string;
      countryCode: string;
      contactNumber: number;
      password: string;
    } = req.body;

    // CHECK PRESENSE OF ALL REQUIRED FIELDS
    const requiredFields = ["userName,email,password"];
    if (requiredFields.some((field) => field.trim() === "")) {
      throw new ApiError("Please provide all required fields!");
    }

    //CHECK UNIQUENESS OF EMAIL AND USERNAME
    const isEmailAlreadyExists = await UserModel.findOne({ email });
    const isUserNameAlreadyExists = await UserModel.findOne({ userName });
    if (isEmailAlreadyExists) {
      throw new ApiError("Email already Exists!");
    } else if (isUserNameAlreadyExists) {
      throw new ApiError("UserName already Exists!");
    }

    const newUser: IUser = await UserModel.create({
      userName,
      email,
      password,
      countryCode,
      contactNumber,
      status: "offline",
    });

    const createdUser: IUser = await UserModel.findById(newUser._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      return res
        .status(500)
        .json(new ApiError("Failed to create a user!, try again"));
    }

    return res
      .status(201)
      .json(new ApiResponse("User create successfully.", createdUser));
  }
);

export const LoginUser = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const { email, password }: { email: string; password: string } = req.body;

    if (!email) {
      return res.status(400).json(new ApiError("Please provide email!"));
    }
    if (!password) {
      return res.status(400).json(new ApiError("Please provide password!"));
    }
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json(new ApiError("User does not exists!"));
    }

    const isPasswordCorrect: Boolean = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json(
          new ApiError("Invalid user credentials.", [
            { field: "password", message: "Incorrect password" },
          ])
        );
    }

    const userID: Types.ObjectId = user._id;

    const { refreshToken, accessToken } = await generateAccessOrRefreshToken(
      userID
    );
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse("User loggedIn successfully.", {
          id: userID,
          token: accessToken,
        })
      );
  }
);

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export const generateAccessOrRefreshToken = async (
  userId: Types.ObjectId
): Promise<TokenResponse> => {
  try {
    const user = (await UserModel.findById(userId)) as IUser | null;
    if (!user) {
      return { accessToken: "", refreshToken: "" };
    }
    const accessToken = user.generateAccessToken() || "";
    const refreshToken = user.generateRefreshToken() || "";
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    return { accessToken: "", refreshToken: "" };
  }
};
