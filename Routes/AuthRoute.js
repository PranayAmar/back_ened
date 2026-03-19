const { Signup,Login,Logout,getUser } = require("../controllers/AuthController");
const { userVerification } = require("../middlewares/AuthMiddleware");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/", userVerification);
router.post("/logout",Logout);
router.get("/getUser",getUser);

module.exports = router;