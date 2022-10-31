const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: process.env.GOOGLE_USER,
		pass: process.env.GOOGLE_PASS,
	},
});

transporter.verify().then(() => {
	console.log("Ready for send emails");
});

module.exports = {
	transporter,
};
