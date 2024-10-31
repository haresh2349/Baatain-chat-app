import {Server as HTTPServer} from "http"
import {Server as SocketIoServer,Socket, Server} from "socket.io"

export const initializeSocket = (server:HTTPServer) => {
    const io = new SocketIoServer(server,{
        cors : {
            origin:"*",
            methods:["GET","POST"]
        }
    })

    io.on("connection",(socket:Socket) => {
        console.log("A user connected:", socket.id);
    })

    io.on("disconnect",(socket:Socket) => {
        console.log("User disconnected",socket.id)
    })
}