const { compare } = require("../utils/handleBcrypt");
const userService = require("../services/userService");
const userModel = require("../models/user");
const { tokenSign } = require("../utils/generateToken");
const { schemaCreate } = require("../validators/userCreatedValidator");

const loginCtrl = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await userModel.findOne({ email });
		if (!user) {
			res.status(404).send({ error: "User not found" });
		}
		const checkPassword = await compare(password, user.password);
		const tokenSession = await tokenSign(user);
		if (checkPassword) {
			res.send({
				info: "Logged in!",
				data: user.username,
				tokenSession,
			});
			return;
		}
		if (!checkPassword) {
			res.status(409).send({ error: "Incorrect Password" });
			return;
		}
	} catch (err) {}
};

const registerCtrl = async (req, res) => {
	try {
		console.log(req.body);
		const validation = await schemaCreate.validateAsync(req.body);
		validation['file']=  req.file.path;
		const registerUser = await userService.createUser(validation);
		res.send({ data: registerUser });
	} catch (err) {
		res.status(400).send({ data: "Bad request" });
	}
};

module.exports = { loginCtrl, registerCtrl };
