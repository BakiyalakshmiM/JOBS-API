const {UnauthenticatedError} = require("../errors/index");
const jwt = require("jsonwebtoken");
require("dotenv").config();

let auth = async (req, res, next) => {
    let {authorization} = req.headers;
    if(!authorization || !authorization.startsWith("Bearer")){
      throw new UnauthenticatedError("Error No Authorization")
    }
    let token = authorization.split(" ")[1];
    if(!token){
        throw new UnauthenticatedError("Token isn't available")
    }
    try{
        let decode = jwt.verify(token, process.env.JSONWEBTOKEN);
        req.user={name: decode.name, _id: decode.id};
        console.log(req.user)
        next();
    }catch(err){
        console.log(err);
        throw new UnauthenticatedError("Invalid Token");
    }
}

module.exports = {
    auth
}

