const { verifyToken } = require("../utils/generateToken");

const checkAuth = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ").pop();
		const tokenData = await verifyToken(token);
		if (tokenData._id) {
			next();
		} else {
			res.status(409).send({ error: "No pasas por aqui xd" });
		}
	} catch (err) {
		res.status(409).send({ error: "fsdfsfsd" });
	}
};

module.exports = { checkAuth };