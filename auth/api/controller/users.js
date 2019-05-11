const JWT = require('jsonwebtoken');

const { JWT_SECRET } = require('../configurations');
const User = require('../models/user');

const signToken = newUser => {
	return JWT.sign(
		{
			iss: 'Anand',
			sub: newUser.id,
			iat: new Date().getTime(),
			exp: new Date().setDate(new Date().getDate() + 1),
		},
		JWT_SECRET
	);
};

module.exports = {
	signUp: async (req, res, next) => {
		const { email, password } = req.value.body;

		const newUser = new User({
			email,
			password,
		});

		try {
			const foundUser = await User.findOne({ email });
			if (foundUser) {
				return res
					.status(403)
					.json({ msg: 'user with same email already exists' });
			}
			await newUser.save();
		} catch (error) {
			throw error;
		}

		const token = signToken(newUser);

		res.status(200).json({ msg: 'Sign Up Successful', token });
	},

	signIn: async (req, res, next) => {
		const token = signToken(req.user);
		res.status(200).json({ msg: 'Sign In Successful', token });
	},

	secret: async (req, res, next) => {
		res.json({ msg: 'authorized' });
	},
};
