const { UserModel } = require("../models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = async (req, res,next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ status: false,message:"Not authenticated" });
    }

    const data = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await UserModel.findById(data.id).select("-password");

    if (!user) {
      return res.status(404).json({ status: false, message:"User not found" });
    } 
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ status: false,message:"Unauthorized" });
  }
}

