import jwt from "jsonwebtoken";
import User from "../models/user.js";

export async function authMiddleware(socket, next) {
  const token = socket.handshake.auth?.token;

  if (!token) {
    console.log("No token provided");
    return next(new Error("Unauthorized"));
  }

  try {
    
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    
    console.log("Socket authenticated for user:", decoded.UserInfo.id);
    
    const findUser = await User.findById(decoded.UserInfo.id);
    if (!findUser) {
        console.log("User not found for socket authentication");
        return next(new Error("Unauthorized"));
    }
    socket.user = findUser;
    
    next();
  } catch (err) {
    console.log("Token invalid or expired");
   
    socket.emit("error", { message: "Forbidden" });

    
    return next(new Error("Forbidden"));
  }
}