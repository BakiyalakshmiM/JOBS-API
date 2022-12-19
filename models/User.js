const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: 2,
    },
    email: {
        type: String,
        required: [true, "Email is mandatory"],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Email id is invalid"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is mandatory"],
        minlength : [5, "Minlength of password is 5"],
        maxlength: [12, "Maxlength od password is 12"]
    }
})

UserSchema.pre("save", async function(next){
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
})

UserSchema.methods.createJWT= function(){
    return jwt.sign({name: this.name, id:this._id}, process.env.JSONWEBTOKEN, {expiresIn: "30d"});
}

UserSchema.methods.comparePassword = async function(userPassword){
    return await bcrypt.compare(userPassword, this.password)
}

let User = mongoose.model("User", UserSchema);

module.exports = {
    User
}