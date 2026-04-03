import rateLimit from "express-rate-limit";

export const AuthLimit = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  message: "Too many requests, try again later.",
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({ message: "Too many requests" });
  }
});

export const addRateHeader = (req, res, next) => {
  if (req.rateLimit) {
    res.setHeader("X-Custom-Limit", req.rateLimit.limit);
    res.setHeader("X-Custom-Remaining", req.rateLimit.remaining);
    res.setHeader("X-Custom-Reset", Math.ceil(req.rateLimit.resetTime?.getTime() / 1000));
  }
  next();
};