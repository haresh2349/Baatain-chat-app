import { model, Schema, Types } from "mongoose";
export interface IConversation extends Document {
  participants: Types.ObjectId[];
  messages: Types.ObjectId[];
  type: string;
  name: string;
  lastMessage: Types.ObjectId;
  updatedAt: Date;
}
export const ConversationSchema = new Schema<IConversation>(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
        required: true,
      },
    ],
    type: {
      type: String,
      enum: ["individual", "group"],
      default: "individual",
    },
    lastMessage: { type: Schema.Types.ObjectId, ref: "Message" },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const ConversationModel = model<IConversation>(
  "Convesation",
  ConversationSchema
);
