import crypto from "crypto";
import Message from "../models/Message.js";

const rooms = {}; 

export async function registerEvents(socket, io) {
  socket.on("createRoom", () => {
    const roomId = crypto.randomBytes(8).toString("hex");
    rooms[roomId] = [socket.user.id]; 
    socket.join(roomId);

    socket.emit("roomCreated", { roomId });
  });

  socket.on("joinRoom", ({ roomId }) => {
    if (rooms[roomId]) {
      rooms[roomId].push(socket.user.username);
      socket.join(roomId);

      io.to(roomId).emit("userJoined", {
        userId: socket.user.id,
        username: socket.user.username,
        roomId,
      });
    } else {
      socket.emit("error", { message: "Room not found" });
    }
  });

   socket.on("chatMessage", async ({ roomId, msg }) => {
    const savedMessage = await Message.create({
        roomId,
        userId: socket.user.id,
        username: socket.user.username,
        content: msg,
    });

  
  socket.to(roomId).emit("chatMessage", {
    _id: savedMessage._id,
    roomId: savedMessage.roomId,
    userId: savedMessage.userId,
    username: savedMessage.username,
    msg: savedMessage.content,
    createdAt: savedMessage.createdAt,
  });
});
socket.on("voice-offer", ({ roomId, offer }) => {
  socket.to(roomId).emit("voice-offer", {
    offer,
    userId: socket.user.id,
  });
});
socket.on("voice-answer", ({ roomId, answer }) => {
  socket.to(roomId).emit("voice-answer", {
    answer,
    userId: socket.user.id,
  });
});
socket.on("video-offer", ({ roomId, offer }) => {
  socket.to(roomId).emit("video-offer", {
    offer,
    userId: socket.user.id,
  });
});
socket.on("video-answer", ({ roomId, answer }) => {
  socket.to(roomId).emit("video-answer", {
    answer,
    userId: socket.user.id,
  });
});
socket.on("ice-candidate", ({ roomId, candidate }) => {
  socket.to(roomId).emit("ice-candidate", {
    candidate,
    userId: socket.user.id,
  });
});
}