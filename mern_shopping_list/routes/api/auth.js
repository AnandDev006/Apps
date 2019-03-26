const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// User Model
const User = require("../../models/User");

/* 
    @route POST api/auth
    @desc Authenticate user
    @access Public
*/
router.post("/", (req, resp) => {
    const { email, password } = req.body;

    // Basic validations
    if (!email || !password)
        return resp.status(400).json({ msg: "Please enter all fields" });

    // Check existing user
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return resp.status(400).json({ msg: "User does not exist" });
            }

            // Validate password
            bcrypt.compare(password, user.password).then(isMatch => {
                if (!isMatch)
                    return resp
                        .status(400)
                        .json({ msg: "Invalid credentials" });

                jwt.sign(
                    { id: user.id },
                    config.get("jwtSecret"),
                    { expiresIn: 3600 },
                    (err, token) => {
                        if (err) throw err;
                        resp.json({
                            token,
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email
                            }
                        });
                    }
                );
            });
        })
        .catch(() =>
            resp.status(404).json({ msg: "DB Error, please try again later." })
        );
});

/* 
    @route GET api/auth/user
    @desc Get user data
    @access Private
*/
router.get("/user", auth, (req, resp) => {
    User.findById(req.user.id)
        .select("-password")
        .then(user => resp.json(user))
        .catch(() =>
            resp.status(404).json({ msg: "DB Error, please try again later." })
        );
});

module.exports = router;
