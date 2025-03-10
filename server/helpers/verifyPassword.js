const bcrypt = require("bcryptjs");



async function verifyPassword(password, hashedPassword) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}
exports.verifyPassword = verifyPassword;
