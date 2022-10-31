const { Router } = require("express");
const router = Router();
const authController = require("../../controllers/authController");
const {uploadImage} = require('../../middlewares/upload');

router
	.post("/login", authController.loginCtrl)
	.post("/register", uploadImage,authController.registerCtrl);

module.exports = router;