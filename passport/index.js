const passport = require('passport');
const local = require('./localStrategy');
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.userid);
    });

    passport.deserializeUser(async (userid, done) => {
        await User.findOne({ where: { userid } })
            .then((user) => done(null, user))
            .catch((err) => done(err));
    });
    local();
}