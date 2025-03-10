function trimUser(user) {
    let { name, email, password } = user;
    name = name && name.trim().toLowerCase();
    email = email && email.trim().toLowerCase();
    password = password && password.trim();
    return { name, email, password };
}
module.exports = { trimUser };
