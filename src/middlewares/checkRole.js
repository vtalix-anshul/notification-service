const sequelize = require("../config/db");
const Doctors = require("../models/Doctor");
const expressAsyncHandler = require("express-async-handler");

module.exports.isApprovedDoctor = expressAsyncHandler(async (req,res,next)=>{
    if(!req.user){
        res.status(401);
        throw new Error("Please login first")
    }
    //log the query ran by sequelize here.
    
    const user = await Doctors.findByPk(req.user.id);
    // check if the user is doctor or not.
    if(req.user.role !== "doctor"){
        res.status(401);
        throw new Error("Unauthorized");
    }
    if(!user.is_approved){
        res.status(403);
        throw new Error("Please wait for approval before accessing this");
    }
    next();
});


module.exports.isDoctor = expressAsyncHandler(async (req,res,next)=>{
    if(!req.user){
        res.status(401);
        throw new Error("Please login first")
    }
    
    // check if the user is doctor or not.
    if(req.user.role !== "doctor"){
        res.status(401);
        throw new Error("Unauthorized");
    }
    next();
});

module.exports.isAdmin = expressAsyncHandler(async (req,res,next)=>{
    if(!req.user){
        res.status(401);
        throw new Error("Please login first")
    }
    if(req.user.role !== "admin"){
        res.status(401);
        throw new Error("Unauthorized");
    }
    next();
});