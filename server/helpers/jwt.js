const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "mySecret";
function authenticate(req, res, next) {
    const token = req.cookies.token;
    console.log(req.cookies);
    if (!token) return res.status(403).json({ status: 403, message: "Unauthorized" });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ status: 403, message: "Invalid token" });
        req.user = user;
        next();
    });
}

function generateToken(user) {
    return jwt.sign({
        id: user.id,
        email: user.email
    },
        JWT_SECRET, {
        expiresIn: "1h"
    }
    );
}

module.exports = { authenticate, generateToken };