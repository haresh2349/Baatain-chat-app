import { UserModel } from "../../models/user-model";
import { asyncHandler } from "../../utills/async-handler";
import { Request, Response } from "express-serve-static-core";
import { ApiResponse } from "../../utills/common-handlers";
export const fetchAllUsers = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const users = await UserModel.find({}, { password: 0, refreshToken: 0 });
    return res.status(200).json(
      new ApiResponse("Users fetched successfully.", {
        totalDataCount: users?.length,
        data: users,
      })
    );
  }
);
