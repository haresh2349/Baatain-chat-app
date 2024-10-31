import { Router } from "express";
import { fetchAllUsers } from "../controllers/users/user.controller";

const router = Router();

router.route("/").get(fetchAllUsers);

export default router
