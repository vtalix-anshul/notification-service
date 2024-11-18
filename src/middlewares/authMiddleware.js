// const User = require("../models/User");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");

module.exports.authMiddleware = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded?.id);
        req.user = user;
        next();
      }
    } catch (err) {

      throw new Error("Session expired, Please login again");
    }
  } else {
    throw new Error("There's no token attached");
  }
});

module.exports.checkStatus = expressAsyncHandler(async (req, res, next) => {
  if(req.user.account_status === "suspend"){
    throw new Error("You are a suspended User");
  }else{
    return next();
  }
});
