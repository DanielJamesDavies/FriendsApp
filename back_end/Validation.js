const Joi = require("@hapi/joi");

const RegisterValidation = (input) => {
	const schema = Joi.object({
		username: Joi.string().min(1).required(),
		nickname: Joi.string().min(1).required(),
		email: Joi.string().min(1).required().email(),
		password: Joi.string().min(6).required(),
	});
	return schema.validate(input);
};

const LoginValidation = (input) => {
	const schema = Joi.object({
		username: Joi.string().min(1).required(),
		password: Joi.string().min(6).required(),
	});
	return schema.validate(input);
};

module.exports.RegisterValidation = RegisterValidation;
module.exports.LoginValidation = LoginValidation;
