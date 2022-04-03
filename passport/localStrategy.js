const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
    passport.use(new localStrategy({
        usernameField: 'userid',
        passwordField: 'password'
    }, async (userid, password, done) => {
        try {
            const exUser = await User.findOne({ where: { userid } });
            if (exUser) {
                const result = await bcrypt.compare(password, exUser.password);
                if (result) {
                    done(null, exUser);
                } else {
                    done(null, false, { message: '비밀번호가 일치하지 않습니다' });
                }
            } else {
                done(null, false, { message: '존재하지 않는 아이디입니다' });
            }
        } catch (error) {
            console.error(error);
            next(error);
        }
    }));
};