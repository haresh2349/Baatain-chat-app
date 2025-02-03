import { NextFunction, Request, Response } from "express-serve-static-core";
import { asyncHandler } from "../../utills/async-handler";
import {
  ApiError,
  ApiResponse,
  Pagination,
} from "../../utills/common-handlers";
import { Types } from "mongoose";
import { ConversationModel } from "../../models/conversation.model";
import { SendMessageRequestParamsDto } from "../../dtos/send-message.dtos";
import { PAGINATION_LIMIT, PAGINATION_PAGE } from "../../constants";
import { MessageModel } from "../../models/message.model";

type IndividualUserProps = {
  type: string;
  _id: Types.ObjectId;
  userName: string;
  email: string;
  profilePhoto: string;
  lastMessage: string;
};

type ConversationResponse = {
  _id: Types.ObjectId;
  type: "individual";
  userId?: Types.ObjectId;
  userName?: string;
  email?: string;
  profilePhoto?: string | null;
  lastMessage?: Types.ObjectId;
  groupId?: Types.ObjectId;
  groupName?: string;
  participants?: IndividualUserProps[];
};

export const getAllConversations = asyncHandler(
  async (
    req: Request<SendMessageRequestParamsDto>,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const { participants } = req.query;
    const sender = req.user?.id;

    if (!sender) {
      return res.status(400).json(new ApiResponse("Unauthorized request!", []));
    }

    const page = parseInt(req.query.page as string) || PAGINATION_PAGE;
    const limit = parseInt(req.query.limit as string) || PAGINATION_LIMIT;

    const pagination = new Pagination(page, limit);
    const totalCount = await ConversationModel.countDocuments();

    // FETCH ALL CONVERSATION WHERE USER IS PARTICIPANT
    const conversations = await ConversationModel.find({
      participants: sender,
    })
      .skip(pagination.getSkip())
      .limit(pagination.limit)
      .populate("participants", "userName email profilePicture")
      .populate("lastMessage")
      .sort({ updatedAt: -1 });

    if (!conversations || !conversations?.length) {
      return res.status(404).json(new ApiResponse("No conversation found", []));
    }
    console.log(totalCount, "len");
    const updatedConversation: ConversationResponse[] = conversations?.map(
      (convo) => {
        const otherUser = convo.participants?.find(
          (user) => user?._id !== sender
        ) as IndividualUserProps | undefined;
        return {
          type: "individual",
          _id: convo?._id,
          userId: otherUser?._id,
          userName: otherUser?.userName,
          email: otherUser?.email,
          profilePhoto: otherUser?.profilePhoto || null,
          lastMessage: convo?.lastMessage || null,
        };
      }
    );
    const paginatedData = pagination.getPaginationMetaData(totalCount);
    return res.status(200).json(
      new ApiResponse("Conversation fetched successfully.", {
        data: updatedConversation,
        ...paginatedData,
      })
    );
  }
);

export const getOneOnOneMessages = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const { conversationId, receiver } = req.query;
    const sender = req.user?.id;
    // if (!conversationId) {
    //   return res.status(400).json(new ApiError("Invalida conversation Id"));
    // }

    const page = parseInt(req.query.page as string) || PAGINATION_PAGE;
    const limit = parseInt(req.query.limit as string) || PAGINATION_LIMIT;
    const pagination = new Pagination(page, limit);
    const totalCount = await MessageModel.countDocuments({
      $or: [
        { sender, reciever: receiver },
        { sender: receiver, reciever: sender },
      ],
    });
    const messages = await MessageModel.find({
      $or: [
        { sender, reciever: receiver },
        { sender: receiver, reciever: sender },
      ],
    })
      .skip(pagination.getSkip())
      .limit(pagination.limit)
      .sort({ createdAt: -1 });

    const paginatedData = pagination.getPaginationMetaData(totalCount);
    return res.status(200).json(
      new ApiResponse("Conversation fetched successfully", {
        data: messages,
        ...paginatedData,
      })
    );
  }
);
