import { Router } from "express";
import { LoginUser, RegisterUser } from "../controllers/users/auth.controller";

const router = Router();

router.route("/register").post(RegisterUser);

router.route("/signin").post(LoginUser);


export default router