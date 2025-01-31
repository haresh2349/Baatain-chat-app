import { model, Schema, Types } from "mongoose";
export interface IGroup {
  name: string;
  description: string;
  admins: Types.ObjectId[];
  participants: Types.ObjectId[];
  messages: Types.ObjectId[];
}
export const GroupSchema = new Schema<IGroup>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    admins: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    participants: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const GroupModel = model("Group", GroupSchema);
