const {User} = require("../models");

const login = async (username, password)=>{
    const user = await User.findOne({username});
    if(!user)
        throw new Error('User not found');
 
    if(user && !(await user.isPasswordMatch(password)))
        throw new Error('Incorrect Password');
    
    return user;
};

module.exports = { login };