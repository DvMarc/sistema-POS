const jwt = require("jsonwebtoken");

const tokenSign = async (user) => {
	return jwt.sign(
		{
			_id: user.id,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: "1h",
		}
	);
};

const verifyToken = async (token) => {
	try {
		return jwt.verify(token, process.env.JWT_SECRET);
	} catch (e) {
		return null;
	}
};

module.exports = { tokenSign, verifyToken };