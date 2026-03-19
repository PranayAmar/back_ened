const {UserModel} = require('../models/UserModel');

const getProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).select("-password");
    res.json({status:true,user}); // full user attached by authMiddleware
  } catch (err) {
    res.status(500).json({status:false, message: "Server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { fullName, phone, bio, avatar } = req.body;

    // Always fetch fresh user from DB
    const user = await UserModel.findById(req.user._id);
    if (!user) return res.status(404).json({ status:false,message: "User not found" });

    // Update fields using DB values as fallback
    user.fullName = fullName || user.fullName;
    user.phone = phone || user.phone;
    user.bio = bio || user.bio;
    user.avatar = avatar || user.avatar;

    // Mark profile complete if required fields are filled
    if (user.fullName && user.phone) {
      user.profileComplete = true;
    }

    // Save changes
    await user.save();

    // Return full updated user (minus password)
    const updatedUser = await UserModel.findById(user._id).select("-password");
    res.json({status:true,user:updatedUser});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getProfile, updateProfile };