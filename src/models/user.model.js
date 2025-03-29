const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { required } = require("joi");

const userSchema = new mongoose.Schema({
    email: { type: String ,unique: true, required: true },
    username: { type: String, unique: true, required: true },  
    password: { type: String, required: true },
    role: { type: String, enum: ["HR", "Employee"],required:true }
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.isPasswordMatch = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema, "users");
module.exports = {User}; 

