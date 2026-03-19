const {UserModel} = require("../models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status:false,message: "User already exists" });
    }
    const user = await UserModel.create({ email, password, username, createdAt });
    const token = jwt.sign({id:user._id},process.env.TOKEN_KEY,{expiresIn:"1d"});
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite:"lax"
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", status: true, user: {
        username:user.username,
        email:user.email,
        createdAt:user.createdAt,
      },
     });
  } catch (error) {
    console.error(error);
    res.status(500).json({status:false,message:"Server error"});
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password ){
      return res.status(400).json({message:'All fields are required',status:false});
    }
    const user = await UserModel.findOne({ email });
    if(!user){
      return res.json({message:'Incorrect password or email' }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.status(400).json({message:'Incorrect password or email',status:false }) 
    }
     const token = jwt.sign({id:user._id},process.env.TOKEN_KEY,{expiresIn:"1d"});
     res.cookie("token", token, {
       secure: false,
       httpOnly: true,
       sameSite:"lax"
     });
     res.status(200).json({ message: "User logged in successfully", status: true,user: {
      username: user.username,
      email:user.email,
     },
     });
  } catch (error) {
    console.error(error);
    res.status(500).json({status:false,message:"Server error"});
  }
};

module.exports.Logout = async (req,res) => {
  res.clearCookie("token", {
    httpOnly:true,
    secure:false,
    sameSite:"lax"
  });
  res.json({status:true, message:"Logged out successfully"});
}

module.exports.getUser = async (req,res) => {
  try {
    const token = req.cookies.token;

    if(!token) 
      return res.status(401).json({status:false,message:"Not authenticated"});

    const decoded = jwt.verify(token,process.env.TOKEN_KEY);
    const user = await UserModel.findById(decoded.id).select("-password");

    res.json({status:true,user});

  } catch(err) {
    res.status(401).json({status:false,message:"Invalid token"});
  }
};