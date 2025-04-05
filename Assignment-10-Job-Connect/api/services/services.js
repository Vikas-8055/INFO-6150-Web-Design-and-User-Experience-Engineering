const User = require('../user/user');

const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@northeastern\.edu$/;
    return emailRegex.test(email);
};

const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

const createUser = async (fullName, email, password, type) => {
    const user = new User({ fullName, email, password, type });
    return user.save();
};

module.exports = {
    validateEmail,
    validatePassword,
    createUser,
};