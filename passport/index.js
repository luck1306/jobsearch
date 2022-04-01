const passport = require('passport');
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        await User.findOne({ where: { userid: id } })
            .then((user) => done(null, user))
            .catch((err) => done(err));
    });
}