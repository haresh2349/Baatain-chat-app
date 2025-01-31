"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_controller_1 = require("../controllers/chat/message.controller");
const router = (0, express_1.Router)();
router.route("/message").post(message_controller_1.sendMessage);
exports.default = router;
