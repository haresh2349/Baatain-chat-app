import { Schema } from "mongoose";
import { ConversationModel } from "../../models/conversation.model";
import { IMessage, MessageModel } from "../../models/message.model";

interface SendMessageRequest extends Request {
    body:{
        content:string
    };
    params:{
        reciever:Schema.Types.ObjectId;
    };
    user?:{
        id:Schema.Types.ObjectId;
    }
}

export const sendMessage = async (req:Request,res:Response) => {
    try {
        const {content} = req.body;
        const {reciever} = req.params; 
        const sender = req.user.id;

        let conversation = await ConversationModel.findOne({
            participants:{$all:[reciever,sender]}
        })
        if(!conversation){
            conversation = await ConversationModel.create({
                 participants:[reciever,sender]
            })
        }

        const newMessage:IMessage = new MessageModel({
            sender,
            reciever,
            content,
        })

        if(newMessage){
            await newMessage.save();
            conversation.messages.push(newMessage);
            await conversation.save()
        }
    } catch (error) {
        
    }
}