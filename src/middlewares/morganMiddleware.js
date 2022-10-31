const morgan = require("morgan");
const logger = require("../utils/logger");

const stream = {
	write: (message) => logger.http(message),
};

const skip = () => {
	const env = process.env.NODE_ENV || "development";
	return env !== "development";
};

morgan.token("body", (req) => {
	return JSON.stringify(req.body);
});

const morganMiddleware = morgan(
	":remote-addr :method :url :status :res[content-length] - :response-time ms",
	{ stream, skip }
);

module.exports = morganMiddleware;