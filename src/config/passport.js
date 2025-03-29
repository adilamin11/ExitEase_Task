const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const config = require("./config"); 
const { User } = require("../models");
 
const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest : ExtractJwt.fromHeader("authorization"),
};
 
const jwtVerify = async (payload, done) => {
  try {
    if(payload.type !== "access"){
      return done(new Error("Invalid token type"));
    }
    const user = await User.findById(payload.id);
    if(!user){
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};
 
const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};
