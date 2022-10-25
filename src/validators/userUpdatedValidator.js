const { check } = require("express-validator");
const { validateResult } = require("../middlewares/validateHelper");

const validateUserUpdate = [
	check("username")
        .optional()
        .bail()
		.notEmpty()
		.withMessage("Usuario es un campo obligatorio"),
	check("password")
        .optional()
        .bail()
		.notEmpty()
		.withMessage("Contrasenia es un campo obligatorio")
        .bail()
		.custom(
			(value, { req }) =>{
				return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/.test(value)
			}
		)
		.withMessage("Ingrese una contrasenia segura"),
    check("email")
        .optional()
        .bail()
		.notEmpty()
		.withMessage("Correo es un campo obligatorio")
        .bail()
		.isEmail()
		.withMessage("Ingrese un correo valido"),
    check("name")
        .optional()
        .bail()
		.notEmpty()
		.withMessage("Nombre es un campo obligatorio"),
    check("lastName")
        .optional()
        .bail()
		.notEmpty()
		.withMessage("Apellido es un campo obligatorio"),
	(req, res, next) => {
		validateResult(req, res, next);
	},
];

module.exports = { validateUserUpdate };