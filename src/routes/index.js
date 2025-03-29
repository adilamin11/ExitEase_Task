const router = require('express').Router();
const authRoute = require('./auth.route');
const userRoute = require("./user.route");
const adminRoute = require("./admin.route");

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/admin", adminRoute);

module.exports = router;