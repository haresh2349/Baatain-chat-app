"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/users/auth.controller");
const router = (0, express_1.Router)();
router.route("/register").post(auth_controller_1.RegisterUser);
router.route("/signin").post(auth_controller_1.LoginUser);
exports.default = router;
