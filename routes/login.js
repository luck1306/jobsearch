const express = require('express');
const router = express.Router();
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
            res.json(info);
            // res.redirect('error', info);
        }
        return req.login(user, (err) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            return res.json(user/*{ message: 'success' }*/); // res.redirect('/choose');
        })
    })(req, res, next);
});

module.exports = router;