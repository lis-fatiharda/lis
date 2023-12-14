import socketio from "socket.io";
import express from "express";
import http from "http";
const app = express();
const port = process.env.lisSocket_PORT || 10203;

const server = http.createServer(app);

const io = socketio(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "OPTIONS"],
    },
});

server.listen(port, () => {
    console.log(`lis-socket running on port : ${port}`);

    io.on("connection", (socket) => {
        console.log("connection aldım");
        console.log(socket.id);

        socket.emit("welcome_message", "Hoş geldiniz");
        socket.on("SEND_MESSAGE", (data) => {
            console.log("Mesaj Geldi", data);
            socket.emit("SEND_MESSAGE", data);
        });
    });
});
