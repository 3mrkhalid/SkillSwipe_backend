import User from '../models/user.js';

export const me = async (req, res, next) => {
  try {
  
    const currentUser = req.user;

    if (!currentUser) {
      return next(new Error("User not authenticated"));
    }

    res.status(200).json({ id: currentUser._id, username : currentUser.username, email: currentUser.email , isAdmin: currentUser.isAdmin, createdAt: currentUser.createdAt });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getAllUsers = async (req, res)=> {
    const users = await User.find().select("-password").lean();

    if(!users.length) {
        return next(new Error("No users found"));
    }

    res.json(users)
}