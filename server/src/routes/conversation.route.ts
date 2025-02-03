import { Router } from "express";
import { sendMessage } from "../controllers/chat/message.controller";
import {
  getAllConversations,
  getOneOnOneMessages,
} from "../controllers/chat/conversation.controller";

const router = Router();

router.route("/message").post(sendMessage);
router.route("/conversation").get(getAllConversations);
router.route("/one-on-one-conversation").get(getOneOnOneMessages);
export default router;
