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
exports.fetchAllUsers = void 0;
const user_model_1 = require("../../models/user-model");
const async_handler_1 = require("../../utills/async-handler");
const common_handlers_1 = require("../../utills/common-handlers");
exports.fetchAllUsers = (0, async_handler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.UserModel.find({}, { password: 0, refreshToken: 0 });
    return res
        .status(200)
        .json(new common_handlers_1.ApiResponse(200, "Users fetched successfully.", {
        totalDataCount: users === null || users === void 0 ? void 0 : users.length,
        data: users
    }));
}));
