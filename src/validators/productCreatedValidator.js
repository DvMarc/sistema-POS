const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    description: Joi.string()
        .required(),
    price: Joi.number()
       .required()
})

module.exports = {
    schema:schema
};
