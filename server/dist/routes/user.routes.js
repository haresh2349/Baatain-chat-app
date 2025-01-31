"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/users/user.controller");
const router = (0, express_1.Router)();
router.route("/").get(user_controller_1.fetchAllUsers);
exports.default = router;
