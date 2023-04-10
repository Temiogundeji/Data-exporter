const router = require("express").Router();
const path = require("path");
const { signup, login } = require(path.join(__dirname, "../controllers/users"));

router.route("/signup").post(signup);
router.route("/login").post(login);

module.exports = router;
