const { transporter } = require("../config/mailer");

const sendEmail = async (user, data) => {
	await transporter.sendMail({
		from: `POS API" <${process.env.GOOGLE_USER}>`,
		to: user,
		subject: "Orden creada",
		text: data,
		html: `<b>${data}<b>`,
	});
};

module.exports = { sendEmail };
