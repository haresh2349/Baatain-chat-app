"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessOrRefreshToken = exports.LoginUser = exports.RegisterUser = void 0;
const async_handler_1 = require("../../utills/async-handler");
const user_model_1 = require("../../models/user-model");
const common_handlers_1 = require("../../utills/common-handlers");
exports.RegisterUser = (0, async_handler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, email, countryCode, contactNumber, password } = req.body;
    // CHECK PRESENSE OF ALL REQUIRED FIELDS
    const requiredFields = ["userName,email,password"];
    if (requiredFields.some(field => field.trim() === "")) {
        throw new common_handlers_1.ApiError(400, "Please provide all required fields!");
    }
    //CHECK UNIQUENESS OF EMAIL AND USERNAME
    const isEmailAlreadyExists = yield user_model_1.UserModel.findOne({ email });
    const isUserNameAlreadyExists = yield user_model_1.UserModel.findOne({ userName });
    if (isEmailAlreadyExists) {
        throw new common_handlers_1.ApiError(409, "Email already Exists!");
    }
    else if (isUserNameAlreadyExists) {
        throw new common_handlers_1.ApiError(409, "UserName already Exists!");
    }
    const newUser = yield user_model_1.UserModel.create({
        userName,
        email,
        password,
        countryCode,
        contactNumber,
        status: "offline"
    });
    const createdUser = yield user_model_1.UserModel.findById(newUser._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new common_handlers_1.ApiError(500, "Failed to create a user!, try again");
    }
    return res
        .status(201)
        .json(new common_handlers_1.ApiResponse(201, "User create successfully.", createdUser));
}));
exports.LoginUser = (0, async_handler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email) {
        throw new common_handlers_1.ApiError(400, "Please provide email!");
    }
    if (!password) {
        throw new common_handlers_1.ApiError(400, "Please provide password!");
    }
    const user = yield user_model_1.UserModel.findOne({ email });
    if (!user) {
        throw new common_handlers_1.ApiError(400, "User does not exists");
    }
    const isPasswordCorrect = yield user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        return res
            .status(401)
            .json(new common_handlers_1.ApiError(401, "Invalid user credentials.", [{ field: "password", message: "Incorrect password" }]));
    }
    const userID = user._id;
    const { refreshToken, accessToken } = yield (0, exports.generateAccessOrRefreshToken)(userID);
    const options = {
        httpOnly: true,
        secure: true,
    };
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new common_handlers_1.ApiResponse(200, "User loggedIn successfully.", { id: userID, token: accessToken }));
}));
const generateAccessOrRefreshToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.UserModel.findById(userId);
        if (!user) {
            throw new common_handlers_1.ApiError(404, "User not found!");
        }
        const accessToken = user.generateAccessToken() || "";
        const refreshToken = user.generateRefreshToken() || "";
        user.refreshToken = refreshToken;
        yield user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    }
    catch (error) {
        throw new common_handlers_1.ApiError(500, "Something went wrong while generating token.");
    }
});
exports.generateAccessOrRefreshToken = generateAccessOrRefreshToken;
