
const jwt = require("jsonwebtoken");
const User = require('../models/user')


const auth = async (req, res, next) => {
  try {
    const token =req.headers.authorization.split(" ")[1];
    const verify = jwt.verify(token, process.env.SECRET_TOKEN);
    const getdata = await User.findOne({ _id: verify._id });
    if (!getdata) {
      throw new Error("user not found");
    }
    req.userId = getdata?._id;
    req.token=token;
    next();
  } catch (e) {
    console.log("authentication failed", e);
    res.json({message:"user not authorized",status:5});
  }
};


const findEmail = async (token) => {
  try {
    const verify = jwt.verify(token, process.env.SECRET_TOKEN);
    const getdata = await User.findOne({ _id: verify._id });
    if (!getdata) {
      throw new Error("user not found");
    }
   return getdata?.email;
  } catch (e) {
    console.log("authentication failed", e);
    res.json({message:"user not authorized",status:5});
  }
};

module.exports = {auth,findEmail};