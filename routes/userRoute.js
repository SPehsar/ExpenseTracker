const express = require("express");
const { loginController, registerController,} = require("../controllers/userController");

// defining router object---------------------------------
const router = express.Router();

// list of the routers ------------------------------------
// login user
router.post("/login", loginController);

// register user
router.post("/register", registerController);
// --------------------------------------------------------

module.exports = router;