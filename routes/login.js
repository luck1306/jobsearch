const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
    try {
        res.json({ message: "success" });
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

router.post('/', (req, res, next) => {
    passport.authenticate('local', (loginError, user, info) => {
        if (loginError) {
            console.error(loginError);
            return next(loginError);
        }
        if (!user) {
            res.json(info);
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