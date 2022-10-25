const { validationResult} = require("express-validator");
const { error } = require("../utils/responses");

const validateResult = (req, res, next) => {
	try {
		validationResult(req).throw();
		return next();
	} catch (err) {
		res.status(403);
		res.send(error("Failed", err.array()));
	}
};

module.exports = { validateResult };