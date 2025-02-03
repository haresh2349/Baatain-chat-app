import { model, Schema, Document, Types } from "mongoose";

export interface IMessage extends Document {
  _id: Types.ObjectId;
  sender: Types.ObjectId;
  reciever: Types.ObjectId;
  content: string;
  contentType?: string;
  readBy?: Types.ObjectId[];
  chatId?: Types.ObjectId[];
  createdAt?: Date;
}

export const MessageSchema = new Schema<IMessage>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reciever: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      enum: ["text", "image", "video", "audio"],
      default: "text",
    },
    readBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    chatId: { type: Schema.Types.ObjectId, ref: "Group" },
  },
  {
    timestamps: true,
  }
);

export const MessageModel = model<IMessage>("Message", MessageSchema);
