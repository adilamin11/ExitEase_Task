const checkAdmin = (req, res, next) => {
    if(req.user.username !== "admin" && req.user.role !== "HR")
        throw new Error("Unauthorized access");
    next();
};

module.exports = {checkAdmin};