"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const http_1 = __importDefault(require("http"));
const db_connection_1 = require("./db_connection");
const errormiddlaware_1 = require("./middleware/errormiddlaware");
const ws_1 = require("ws");
(0, db_connection_1.connection)();
_1.default.use(errormiddlaware_1.errorHandler);
const server = http_1.default.createServer(_1.default);
const wss = new ws_1.WebSocketServer({ server });
wss.on("connection", (ws) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Connected");
    ws.on('message', (mess) => {
        console.log("Message", mess);
        ws.send(`hello you send -> ${mess}`);
    });
}));
server.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
});
