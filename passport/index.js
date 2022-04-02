const passport = require('passport');
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.username);
    });

    passport.deserializeUser(async (id, done) => {
        await User.findOne({ where: { username: id } })
            .then((user) => done(null, user))
            .catch((err) => done(err));
    });
}