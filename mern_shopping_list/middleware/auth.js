const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, resp, next) {
    const token = req.header("x-auth-token");

    //Check token
    if (!token) return resp.status(401).json({ msg: "No token, authorization denied" });

    try {        
        // Verify token
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        
        // Add user from payload
        req.user = decoded;
        next();
    } catch (e) {
        resp.status(400).json( { msg: 'Token is invalid'});
    }
}

module.exports = auth;