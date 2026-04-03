import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

const verifyJwt = (req, res, next) => {
  try {
    
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      
      return next(new AppError("No token provided or invalid format", 401));
    }

   
    const token = authHeader.split(" ")[1];


    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return next(new AppError("Invalid or expired token", 401));
      }
      
      req.user = decoded;
      next();
    });
  } catch (error) {
    next(new AppError("Something went wrong in JWT verification", 500));
  }
};

export default verifyJwt;