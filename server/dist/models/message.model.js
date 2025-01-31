"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModel = exports.MessageSchema = void 0;
const mongoose_1 = require("mongoose");
exports.MessageSchema = new mongoose_1.Schema({
    sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    reciever: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    contentType: {
        type: String,
        enum: ["text", "image", "video", "audio"],
        default: "text",
    },
    readBy: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    groupId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Group" },
}, {
    timestamps: true,
});
exports.MessageModel = (0, mongoose_1.model)("Message", exports.MessageSchema);
