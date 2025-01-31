"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const conversation_model_1 = require("../../models/conversation.model");
const message_model_1 = require("../../models/message.model");
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { content } = req.body;
        const { reciever } = req.params;
        const sender = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        let conversation = yield conversation_model_1.ConversationModel.findOne({
            participants: { $all: [reciever, sender] },
        });
        if (!conversation) {
            conversation = yield conversation_model_1.ConversationModel.create({
                participants: [reciever, sender],
            });
        }
        const newMessage = new message_model_1.MessageModel({
            sender,
            reciever,
            content,
            contentType: "text",
        });
        if (newMessage) {
            yield newMessage.save();
            conversation.messages.push(newMessage === null || newMessage === void 0 ? void 0 : newMessage._id);
            yield conversation.save();
        }
        console.log(newMessage, "newMessage");
    }
    catch (error) { }
});
exports.sendMessage = sendMessage;
