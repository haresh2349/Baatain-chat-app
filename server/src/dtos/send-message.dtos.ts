import { Types } from "mongoose";

export interface SendMessageRequestBodyDto {
  content?: string;
  contentType?: string;
  participants?: Types.ObjectId[];
}

export interface SendMessageRequestParamsDto {
  reciever?: Types.ObjectId;
}
