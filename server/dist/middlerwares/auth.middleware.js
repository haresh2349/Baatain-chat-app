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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const async_handler_1 = require("../utills/async-handler");
const common_handlers_1 = require("../utills/common-handlers");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user-model");
exports.verifyToken = (0, async_handler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken) ||
        ((_b = req.header("Authorization")) === null || _b === void 0 ? void 0 : _b.replace("Bearer ", ""));
    if (!token) {
        throw new common_handlers_1.ApiError(401, "Unauthorized request!");
    }
    let decodedToken = null;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_KEY);
    }
    catch (error) {
        throw new common_handlers_1.ApiError(401, "Invalid access token");
    }
    const user = yield user_model_1.UserModel.findById(decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken._id).select("-password -refreshToken");
    if (!user) {
        throw new common_handlers_1.ApiError(401, "Invalid access token");
    }
    req.user = { id: user === null || user === void 0 ? void 0 : user._id, userName: user === null || user === void 0 ? void 0 : user.userName };
    console.log(user, "user");
    next();
}));
