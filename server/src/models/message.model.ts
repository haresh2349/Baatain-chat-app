import { model, Schema,Document } from "mongoose";

export interface IMessage extends Document  {
    sender:Schema.Types.ObjectId;
    reciever:Schema.Types.ObjectId;
    content:string;
    contentType:string;
    createdAt: Date
}

export const MessageSchema = new Schema<IMessage>({
    sender:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    reciever:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    content:{
        type:String,
        required:true
    },
    contentType: {
        type: String,
        enum: ['text', 'image', 'video', 'audio'],
        default: 'text'
    }
},
{
    timestamps:true
}
)

export const MessageModel = model<IMessage>("Message",MessageSchema)
