const jwt = require("jsonwebtoken");
const config = require("../config/config");

const generateToken = (userId, expires, type, secret = config.jwt.secret) => { 
  const payload = { id: userId, exp: expires, type };  
  return jwt.sign(payload, secret);
};

const generateAuthTokens = async (user) => {  
  const expiration = Math.floor(Date.now()/1000 + config.jwt.accessExpirationMinutes*60);     
  return {token: generateToken(user._id, expiration, "access"), role: user.role};  
};
  
module.exports = {
  generateToken,
  generateAuthTokens,
};