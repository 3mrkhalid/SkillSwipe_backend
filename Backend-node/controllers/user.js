import User from "../models/User.js"
import bcrypt from "bcryptjs";
import AppError from "../utils/AppError.js";
import { signAccessToken, signRefreshToken} from "../utils/jwt.js"
import sendMail from "../utils/sendMail.js"

export const login = async (req, res, next) => {

 try {
    const { email, password } = req.body;

   
    if (!email || !password) {
      return next(new AppError('Email and password are required', 400));
    }

    
    const user = await User.findOne({ email });
    if (!user) {
      return next(new AppError('Invalid email or password', 401));
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new AppError('Invalid email or password', 401));
    }

    const accessToken = signAccessToken(user._id);
    const refreshToken = signRefreshToken(user._id);

   
    res.cookie('refreshToken', refreshToken, {
       httpOnly: true,
       secure: process.env.NODE_ENV === 'production',
       sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'none',
     });

    res.status(200).json({
      status: 'success',
      message: 'Logged in successfully',
      Token: accessToken
    });

  } catch (err) {
    next(err);
  }
};

export const register = async (req, res, next) => {

 try {
    const { username, email, password } = req.body;

   
    if (!username || !email || !password) {
      return next(new AppError('All field are required', 400));
    }


    const hashedPassword = await bcrypt.hash(password, 10)

    
    const newUser = await User.create({username, email, password:hashedPassword});


    const accessToken = signAccessToken(newUser._id);
    const refreshToken = signRefreshToken(newUser._id);

   
    res.cookie('refreshToken', refreshToken, {
       httpOnly: true,
       secure: process.env.NODE_ENV === 'production',
       sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'none',
     });

    res.status(201).json({
      status: 'success',
      message: 'register successfull',
      Token: accessToken
    });

  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new AppError("Unauthorized", 401));
    }
   
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
    });

    res.status(200).json({
      status: "success",
      message: "Logged out successfully",
    });

  } catch (err) {
    next(err);
  }
};

export const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) return next(new AppError("Email required", 400));

    const findUser = await User.findOne({ email });
    if (!findUser) return next(new AppError("User not found", 404));

    const resetCode = Math.floor(100000 + Math.random() * 900000); // 6 digits
    
    const hashedResetCode = crypto.createHash("sha256").update(resetCode.toString()).digest("hex");

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    findUser.hashedResetCode = hashedResetCode;
    findUser.resetCodeExpiresAt = expiresAt;
    findUser.verifyResetCode = false;
    await findUser.save();

    try {
      await sendMail({
        to: findUser.email,
        subject: "Password Reset Code",
        html: `<p>Your password reset code is: <b>${resetCode}</b></p><p>It expires in 10 minutes.</p>`,
      });
    }catch(err) {
      findUser.hashedResetCode = null;
      findUser.resetCodeExpiresAt = null;
      findUser.verifyResetCode = false;
      await findUser.save();
      next(err)
    }

    res.status(201).json({
      message: `Reset code created successfully`,
      resetCode, 
    });

  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { email, newPassword, resetCode } = req.body;

    if (!email || !newPassword || !resetCode) {
      return next(new AppError("All fields are required", 400));
    }

    const findUser = await User.findOne({ email }).select("+hashedResetCode +resetCodeExpiresAt");
    if (!findUser) return next(new AppError("User not found", 404));

   
    const hashedInputCode = crypto.createHash("sha256").update(resetCode.toString()).digest("hex");

  
    if (
      findUser.hashedResetCode !== hashedInputCode ||
      !findUser.resetCodeExpiresAt ||
      findUser.resetCodeExpiresAt < new Date()
    ) {
      return next(new AppError("Invalid or expired reset code", 400));
    }

    const hashedPassword = bcrypt.hash(newPassword, 10)

    findUser.password = hashedPassword; 
    findUser.hashedResetCode = null;
    findUser.resetCodeExpiresAt = null;
    findUser.verifyResetCode = true;
    await findUser.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    next(err);
  }
};