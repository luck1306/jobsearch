const passport = require('passport');


module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        done(null, id)
            .then()
            .catch();
    });
}