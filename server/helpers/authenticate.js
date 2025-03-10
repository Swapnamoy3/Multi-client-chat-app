const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../app");

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
exports.authenticate = authenticate;
