"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupModel = exports.GroupSchema = void 0;
const mongoose_1 = require("mongoose");
exports.GroupSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    admins: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    participants: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    ],
}, {
    timestamps: true,
});
exports.GroupModel = (0, mongoose_1.model)("Group", exports.GroupSchema);
