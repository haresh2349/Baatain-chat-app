"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongodb_connection_1 = require("./utills/mongodb-connection");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const server = http_1.default.createServer(app);
// middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
const conversation_route_1 = __importDefault(require("./routes/conversation.route"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const socket_service_1 = require("./services/socket.service");
const auth_middleware_1 = require("./middlerwares/auth.middleware");
const io = (0, socket_service_1.initializeSocket)(server);
app.use("/api/v1/auth", auth_routes_1.default);
app.use("/api/v1/chat", auth_middleware_1.verifyToken, conversation_route_1.default);
server.listen(port, () => {
    console.log(`Listening on PORT : ${port}`);
});
(0, mongodb_connection_1.connectToDB)();
