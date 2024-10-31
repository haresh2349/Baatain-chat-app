import mongoose from "mongoose";
import { MONGO_DB_URL } from "../configs/mongoDB-config";
async function connectToDB () {
    try {
        await mongoose.connect(MONGO_DB_URL);
        console.log("Connected")
    } catch (error) {
        console.log(error)
        console.log("Connection failed!")
    }
}

export {connectToDB}