import { Socket } from "socket.io";
import { randomUUID } from "crypto";
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket :Socket) => {
    console.log(`A user connected: ${socket.id}`);
    const roomId = randomUUID();
    socket.data.roomId = roomId;

    socket.join(socket.data.roomId);
    console.log("Starting room: ", socket.data.roomId);

    socket.on("enter", (newRoom)=>{
        socket.leave(socket.data.roomId);
        socket.join(newRoom);
        socket.data.roomId = newRoom;
        socket.emit('roomId', newRoom);
        console.log(`User ${socket.id} entered room: ${newRoom}`);
        socket.to(newRoom).emit('updateNPlayers',2);
    });

    socket.on("currentRoomId",()=>{
        socket.emit('roomId', socket.data.roomId);
    });

    socket.on("myPlayerInfo", (data)=>{
        console.log(`Received player info from ${socket.id} in room ${socket.data.roomId}:`, data);
        socket.to(socket.data.roomId).emit('otherPlayerInfo', data);
    });

    socket.on("start", ()=>{
        console.log("match started");
        socket.to(socket.data.roomId).emit('startMatch');
    });

    socket.on("sendMove", (data)=>{
        console.log("move sent");
        socket.to(socket.data.roomId).emit('move',data.matchGrid);
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
        socket.to(socket.data.roomId).emit('playerDisconnect');
    });
});
const port = 3000;

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});