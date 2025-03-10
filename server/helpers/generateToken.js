const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../app");

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
exports.generateToken = generateToken;
