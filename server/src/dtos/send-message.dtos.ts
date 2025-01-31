import { Types } from "mongoose";

export interface SendMessageRequestBodyDto {
  content?: string;
  contentType?: string;
}

export interface SendMessageRequestParamsDto {
  reciever?: Types.ObjectId;
}
