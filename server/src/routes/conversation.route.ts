import { Router } from "express";
import { sendMessage } from "../controllers/chat/message.controller";

const router = Router();

router.route("/message").post(sendMessage);

export default router;
