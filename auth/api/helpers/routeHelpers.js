const Joi = require('joi');

module.exports = {
	validateBody: schema => (req, res, next) => {
		const result = Joi.validate(req.body, schema);
		if (result.error) {
			return res.status(400).json(result.error);
		}

		if (!req.value) {
			req.value = {};
		}
		req.value.body = result.value;
		next();
	},
	schemas: {
		signUpSchema: Joi.object().keys({
			name: Joi.string().required(),
			email: Joi.string()
				.email()
				.required(),
			password: Joi.string().required(),
		}),
		signInSchema: Joi.object().keys({
			email: Joi.string()
				.email()
				.required(),
			password: Joi.string().required(),
		}),
	},
};
