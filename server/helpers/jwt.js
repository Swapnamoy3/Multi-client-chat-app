const jwt = require("jsonwebtoken");
const { getUser } = require("../database.js");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "mySecret";
function authenticate(req, res, next) {
    const token = req.cookies.token;
    console.log(req.cookies);
    if (!token) return res.status(403).json({ status: 403, message: "Unauthorized" });

    jwt.verify(token, JWT_SECRET, (err, u) => {
        if (err) return res.status(403).json({ status: 403, message: "Invalid token" });
        const user = getUser(u.email);
        if(!user) return res.status(403).json({ status: 403, message: "User Deleted" });
        
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