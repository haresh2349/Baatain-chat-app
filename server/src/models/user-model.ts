import { Schema,model,Document, Types } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export interface IUser extends Document {
    _id: Types.ObjectId;
    userName:string;
    email: string;
    countryCode: string;
    contactNumber: number;
    password: string;
    profilePicture?: string;   // Optional
    lastSeen?: Date;           // Optional
    createdAt?: Date;          // Optional
    status?: string;           // Optional
    refreshToken: string;
    generateAccessToken: () => string;
    generateRefreshToken: () => string;
    isPasswordCorrect:(password:string) => Promise<Boolean>;
}
const UserSchema = new Schema<IUser>({
    userName: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    // countryCode:{
    //     type:String,
    //     required:true
    // },
    // contactNumber:{
    //     type:Number,
    //     required:true
    // },
    password:{
        type:String,
        required:true
    },
    profilePicture: {
        type:String
    },
    lastSeen: {
        type: Date
    },
    status: {
        type: String
    },
    refreshToken: {
      type: String,
    },
},
{
    timestamps: true,
})

UserSchema.pre("save",async function(next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10)
})

UserSchema.methods.isPasswordCorrect = async function (password:string):Promise<Boolean> {
    return await bcrypt.compare(password,this.password)
}

UserSchema.methods.generateAccessToken = function () : string {
    const user = this as IUser
    return jwt.sign(
        {
        _id: user._id,
        email: user.email,
        userName: user.userName
        },
        process.env.ACCESS_TOKEN_KEY as string,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY as string,
        }
    )
}


UserSchema.methods.generateRefreshToken = function() : string {
    const user = this as IUser
    return jwt.sign(
        {
        _id: user.id,
        email: user.email,
        userName: user.userName
        },
        process.env.REFRESH_TOKEN_KEY as string,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY as string,
        }
    )
}

export const UserModel = model<IUser>("User",UserSchema)