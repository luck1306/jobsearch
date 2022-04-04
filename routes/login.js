const epxress = require('express');
const router = epxress.Router();
const passport = require('passport');

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', (req, res, next) => {
    passport.authenticate('local', (loginError, user, info) => {
        if (loginError) {
            console.error(loginError);
            return next(loginError);
        }
        if (!user) {
            res.json({ message: info.message });
            // res.redirect('error', info);
        }
        return req.login(user, (err) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            return res.json({ message: 'success' });
        })
    })(req, res, next);
});

module.exports = router;