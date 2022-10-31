const Joi = require('joi');

const schema = Joi.object({
    products: Joi.array()
        .required(),
    client: Joi.string()
        .alphanum()
        .required(),
})

module.exports = {
    schema: schema,
};
