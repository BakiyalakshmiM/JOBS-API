const { User } = require("../models/User");
const {StatusCodes} = require("http-status-codes");
const { BadRequestError, UnauthenticatedError}= require("../errors/index");
let signup = async (req, res, next)=>{
    let user = await User.create(req.body)
    let token = user.createJWT();
    res.status(StatusCodes.CREATED).json({user, token});
}

let login = async (req, res, next)=>{
    let {email , password} = req.body;
    if(!email || !password){
        throw new BadRequestError("Provide email and password");
    }
    let user = await User.findOne({email});
    console.log(user);
    if(!user){
        throw new UnauthenticatedError("Email is not registered");
    }
    let isCorrectPassword = await user.comparePassword(password);
    console.log(isCorrectPassword);
    if(!isCorrectPassword){
        throw new UnauthenticatedError("Password is incorrect")
    }
    let token = user.createJWT();
    res.status(StatusCodes.OK).json({email: user.email, token});
}

module.exports = {
    signup,
    login
}