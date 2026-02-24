import express from "express";
import Message from "../models/Message.js";
import { verifyJWT } from "../middleware/protect.js"

const router = express.Router();

router.use(verifyJWT)

router.get("/:roomId", async (req, res) => {
  const { roomId } = req.params;

  const messages = await Message.find({ roomId })
    .sort({ createdAt: 1 })
    .limit(100);

  res.json(messages);
});

export default router;