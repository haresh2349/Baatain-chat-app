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
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    // countryCode:{
    //     type:String,
    //     required:true
    // },
    // contactNumber:{
    //     type:Number,
    //     required:true
    // },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    },
    lastSeen: {
        type: Date
    },
    status: {
        type: String
    },
    refreshToken: {
        type: String,
    },
}, {
    timestamps: true,
});
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password"))
            return next();
        this.password = yield bcrypt_1.default.hash(this.password, 10);
    });
});
UserSchema.methods.isPasswordCorrect = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(password, this.password);
    });
};
UserSchema.methods.generateAccessToken = function () {
    const user = this;
    return jsonwebtoken_1.default.sign({
        _id: user._id,
        email: user.email,
        userName: user.userName
    }, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
};
UserSchema.methods.generateRefreshToken = function () {
    const user = this;
    return jsonwebtoken_1.default.sign({
        _id: user.id,
        email: user.email,
        userName: user.userName
    }, process.env.REFRESH_TOKEN_KEY, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });
};
exports.UserModel = (0, mongoose_1.model)("User", UserSchema);
