import { authMiddleware } from "./authSocket.js";
import { registerEvents } from "./events.js";

export function initSocket(io) {
 
  io.use(authMiddleware);

  // connection handler
  io.on("connection", (socket) => {
    console.log("User connected:", socket.user.id);

   
    registerEvents(socket, io);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.user.id);
    });
  });
}