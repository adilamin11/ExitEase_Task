const passport = require("passport"); 

const verifyCallback = (req, resolve, reject) => (err, user, info) => {
    if(err || !user){
        throw new Error("Please authenticate");
    }else{
        req.user = user;
        resolve();
    }
}; 

const auth = async (req, res, next) => {
    return new Promise((resolve, reject) => {
        passport.authenticate(
        "jwt",
        { session: false },
        verifyCallback(req, resolve, reject)
        )(req, res, next);
    })
    .then(() => next())
    .catch((err) => next(err));
}; 

module.exports = {auth};



//
// const passport = require("passport");

// const auth = (req, res, next) => {
//     passport.authenticate("jwt", { session: false }, (err, user, info) => {
//         if (err) {
//             return res.status(500).json({ message: "Internal Server Error" });
//         }
//         if (!user) {
//             return res.status(401).json({ message: "Unauthorized - Please authenticate" });
//         }
//         req.user = user;
//         next();
//     })(req, res, next);
// };

// module.exports = { auth };
