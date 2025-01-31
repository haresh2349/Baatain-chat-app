"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationModel = exports.ConversationSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ConversationSchema = new mongoose_1.Schema({
    participants: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    ],
    messages: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Message",
            required: true
        }
    ]
}, { timestamps: true });
exports.ConversationModel = (0, mongoose_1.model)("Convesation", exports.ConversationSchema);
