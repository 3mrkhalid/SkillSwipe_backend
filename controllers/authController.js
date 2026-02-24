// authController.js
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import crypto from "crypto";

/* ================= HELPER FUNCTIONS ================= */
const generateTokens = (user) => {
  const payload = { UserInfo: { id: user._id, isAdmin: user.isAdmin } };

  return {
    accessToken: jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    }),
    refreshToken: jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    }),
  };
};

const setRefreshCookie = (res, refreshToken) => {
  res.cookie("jwt", refreshToken, {
    httpOnly: process.env.NODE_ENV === "production" ? true : false,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

/* ================= REGISTER ================= */
export const register = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return next(new AppError("All fields are required", 400));

  const exists = await User.findOne({ $or: [{ username }, { email }] });
  if (exists)
    return next(new AppError("User already exists", 409));

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    isAdmin: false,
  });

  const { accessToken, refreshToken } = generateTokens(newUser);
  setRefreshCookie(res, refreshToken);

  res.status(201).json({
    id: newUser._id,
    username: newUser.username,
    email: newUser.email,
    isAdmin: newUser.isAdmin,
    accessToken,
  });
});

/* ================= LOGIN ================= */
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError("All fields are required", 400));

  const foundUser = await User.findOne({ email });
  if (!foundUser)
    return next(new AppError("Invalid email or password", 401));

  const match = await bcrypt.compare(password, foundUser.password);
  if (!match)
    return next(new AppError("Invalid email or password", 401));

  const { accessToken, refreshToken } = generateTokens(foundUser);
  setRefreshCookie(res, refreshToken);

  res.json({
    id: foundUser._id,
    username: foundUser.username,
    email: foundUser.email,
    isAdmin: foundUser.isAdmin,
    token: accessToken,
  });
});

/* ================= LOGOUT ================= */
export const logout = (req, res) => {
  const refreshToken = req.cookies?.jwt;

  if (!refreshToken) return res.sendStatus(204);

  res.clearCookie("jwt", {
    httpOnly: process.env.NODE_ENV === "production" ? true : false,
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  res.json({ message: "logout successfully" });
};

/* ================= REFRESH ================= */
export const refresh = catchAsync(async (req, res, next) => {
  const refreshToken = req.cookies?.jwt;

  if (!refreshToken)
    return next(new AppError("Unauthorized", 401));

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return next(new AppError("Forbidden", 403));

      const foundUser = await User.findById(decoded.UserInfo.id);
      if (!foundUser)
        return next(new AppError("User not found", 401));

      const { accessToken } = generateTokens(foundUser);
      res.json({ accessToken });
    }
  );
});

export const forgetPassword = catchAsync(async (req, res, next) => {
    const { email } = req.body;

    if (!email)
      return next(new AppError("Email is required", 400));

    const findUser = await User.findOne({email});

    if(!findUser) return next(new AppError("User not found", 404));


    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    const hasedResetCode = crypto.createHash("sha256").update(resetCode).digest("hex");

    findUser.ResetCode = hasedResetCode;
    findUser.resetCodeExpires = Date.now() + 10 * 60 * 1000;
    findUser.isVerifiedCode = false;

    await findUser.save();

    try {
        await sendEmail({
            email: findUser.email,
            name: findUser.username,
            code: resetCode,
            expire: "10 minutes"
        });
    }catch(err) {
        findUser.ResetCode = undefined;
        findUser.resetCodeExpires = undefined;
        findUser.isVerifiedCode = false;
        await findUser.save();
        return next(new AppError("Failed to send email", 500));
    }

    

    res.json({message: "Reset code generated successfully", resetCode});
});

export const verifyResetCode = catchAsync(async (req, res, next) => {
    const { email, resetCode } = req.body;

    if(!email || !resetCode) return next(new AppError("Email and reset code are required", 400));

    const findUser = await User.findOne({email, ResetCode: resetCode, resetCodeExpires: {$gt: Date.now()}});

    if(!findUser) return next(new AppError("Invalid or expired reset code", 400));
   

    findUser.isVerifiedCode = true;
    await findUser.save();

    res.json({message: "Reset code verified successfully"});
});

export const resetPassword = catchAsync(async (req, res, next) => {
    const { email, resetCode, newPassword } = req.body;
    
    if(!email || !resetCode || !newPassword) return next(new AppError("Email, reset code and new password are required", 400));

    const findUser = await User.findOne({email, ResetCode: resetCode, resetCodeExpires: {$gt: Date.now()}, isVerifiedCode: true});

    if(!findUser) return next(new AppError("Invalid or expired reset code", 400));
    
    try {

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        findUser.password = hashedPassword;
        findUser.ResetCode = undefined;
        findUser.resetCodeExpires = undefined;
        findUser.isVerifiedCode = false;
        await findUser.save();
        res.json({message: "Password reset successfully"});

    }catch(err) {
        return next(new AppError("Failed to reset password", 500));
    }
    
    res.status(200).json({message:"resetPassword Successfully"})
  });