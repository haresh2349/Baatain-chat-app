import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import http from "http"
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { connectToDB } from "./utills/mongodb-connection";
dotenv.config();

const app = express();
const port = process.env.PORT 
const server = http.createServer(app)


// middlewares
app.use(cors());
app.use(express.json())
app.use(bodyParser.json())
app.use(cookieParser())

import UserRouter from "./routes/user.routes";
import AuthRouter from "./routes/auth.routes"
import { initializeSocket } from "./services/socket.service";
import { verifyToken } from "./middlerwares/auth.middleware";

const io = initializeSocket(server);
app.use("/api/v1/auth",AuthRouter)
app.use("/api/v1/users",verifyToken,UserRouter);


server.listen(port,() => {
    console.log(`Listening on PORT : ${port}`)
})

connectToDB()   