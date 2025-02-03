import { Schema } from "mongoose";
import { ConversationModel } from "../../models/conversation.model";
import { IMessage, MessageModel } from "../../models/message.model";
import { Request, Response } from "express-serve-static-core";
import {
  SendMessageRequestBodyDto,
  SendMessageRequestParamsDto,
} from "../../dtos/send-message.dtos";
import { ApiError, ApiResponse } from "../../utills/common-handlers";
import { asyncHandler } from "../../utills/async-handler";

export const sendMessage = asyncHandler(
  async (
    req: Request<SendMessageRequestParamsDto, {}, SendMessageRequestBodyDto>,
    res: Response
  ): Promise<void> => {
    const { content } = req.body;
    const { reciever } = req.query;
    const sender = req.user?.id;
    let conversation = await ConversationModel.findOne({
      participants: { $all: [reciever, sender] },
    });
    if (!conversation) {
      conversation = await ConversationModel.create({
        participants: [reciever, sender],
      });
    }
    const contentType = {
      string: "text",
    };

    const newMessage: IMessage = new MessageModel({
      sender,
      reciever,
      content,
      contentType: "text",
    });

    if (newMessage) {
      await newMessage.save();
      conversation.messages.push(newMessage?._id);
      conversation.lastMessage = newMessage?._id;
      await conversation.save();
    }
    res
      .status(201)
      .send(new ApiResponse("Message created successfully.", null));
    // try {

    // } catch (error) {
    //   res.status(500).send(new ApiError("Internal server error!"));
    // }
  }
);
