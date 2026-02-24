import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const verifyJWT = async (req, res, next) => {
  try {
    const authHeaders = req.headers.authorization || req.headers.Authorization;

    if (!authHeaders?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeaders.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const user = await User.findById(decoded.UserInfo.id); // UserInfo حسب payload
      if (!user) return res.status(401).json({ message: "Unauthorized" });

      req.user = user;
      next();
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export const verifyAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ message: "Admin only" });
  }
  next();
};