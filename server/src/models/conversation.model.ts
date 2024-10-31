import { model, Schema, Types } from "mongoose";
export interface IConversation extends Document {
    participants:Types.ObjectId[],
    messages:Types.ObjectId[];
}
export const ConversationSchema = new Schema<IConversation>({
    participants:[
        {
            type: Schema.Types.ObjectId,
            ref:"User",
            required:true
        }
    ],
    messages:[
        {
            type:Schema.Types.ObjectId,
            ref:"Message",
            required:true
        }
    ]
},{timestamps:true})

export const ConversationModel = model<IConversation>("Convesation",ConversationSchema)