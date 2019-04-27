const JWT = require('jsonwebtoken');
const User = require('../models/User');

const signToken = user =>
  JWT.sign(
    {
      iss: 'Anand',
      sub: user.id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
    },
    `${process.env.jwtSecret}`
  );

module.exports = {
  signUp: async (req, res, next) => {
    const { name, email, password } = req.value.body;

    // Check if user exist with same email
    const foundUser = await User.findOne({ 'local.email': email });
    if (foundUser) {
      return res.status(403).json({ msg: 'Email already in use' });
    }

    // Create new user
    const newUser = new User({
      method: 'local',
      local: {
        name,
        email,
        password,
      },
    });

    await newUser.save();

    const token = signToken(newUser);

    // Respond with token
    console.log('SignUp successful');
    res.status(200).json({ token });
  },

  signIn: async (req, res, next) => {
    const token = signToken(req.user);

    // Respond with token
    console.log('SignIn successful');
    res.status(200).json({ token });
  },

  googleOAuth: async (req, res, next) => {
    const token = signToken(req.user);

    // Respond with token
    console.log('Google SignIn successful');
    res.status(200).json({ token });
  },

  facebookOAuth: async (req, res, next) => {
    const token = signToken(req.user);

    // Respond with token
    console.log('Facebook SignIn successful');
    res.status(200).json({ token });
  },

  secret: async (req, res, next) => {
    res.json({ msg: 'authorized' });
  },
};
