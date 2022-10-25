const { check } = require("express-validator");
const { validateResult } = require("../middlewares/validateHelper");

const validateUserCreate = [
	check("username")
		.exists()
		.withMessage("Campo no existe")
		.bail()
		.notEmpty()
		.withMessage("Usuario es un campo obligatorio"),
	check("password")
		.exists()
		.withMessage("Campo no existe")
		.bail()
		.notEmpty()
		.withMessage("Contrasenia es un campo obligatorio")
		.custom(
			(value, { req }) =>{
				return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/.test(value)
			}
		)
		.withMessage("Ingrese una contrasenia segura"),
    check("email")
		.exists()
		.withMessage("Campo no existe")
		.bail()
		.notEmpty()
		.withMessage("Correo es un campo obligatorio")
		.bail()
		.isEmail()
		.withMessage("Ingrese un correo valido"),
    check("name")
		.exists()
		.withMessage("Campo no existe")
		.bail()
		.notEmpty()
		.withMessage("Nombre es un campo obligatorio"),
    check("lastName")
		.exists()
		.withMessage("Campo no existe")
		.bail()
		.notEmpty()
		.withMessage("Apellido es un campo obligatorio"),
	(req, res, next) => {
		validateResult(req, res, next);
	},
];

module.exports = { validateUserCreate };