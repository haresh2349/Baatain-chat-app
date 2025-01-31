"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_DB_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// exports = {
//   MONGO_DB_HOST: process.env.MONGO_DB_HOST,
//   MONGO_DB_NAME: process.env.MONGO_DB_NAME,
//   MONGO_DB_USERNAME: process.env.MONGO_DB_USERNAME,
//   MONGO_DB_PASSWORD: process.env.MONGO_DB_PASSWORD,
//   MONGO_DB_PORT: process.env.MONGO_DB_PORT,
//   MONGO_DB_PROTOCOL: process.env.MONGO_DB_PROTOCOL,
// };
const MONGO_DB_URL = process.env.MONGO_DB_PROTOCOL == "mongodb+srv"
    ? `${process.env.MONGO_DB_PROTOCOL}://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}/${process.env.MONGO_DB_NAME}`
    : `${process.env.MONGO_DB_PROTOCOL}://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_NAME}`;
exports.MONGO_DB_URL = MONGO_DB_URL;
