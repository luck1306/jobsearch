const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
    res.render('join');
});

router.post('/', async (req, res, next) => {
    try {
        const { id, password } = req.body;
        const exUser = User.findOne({ where: { id } });
        if (exUser) {
            res.redirect('/login', { message: '이미 가입되어있습니다' });
        }

        const hash = bcrypt.hash(password, 12);
        await User.create({
            id,
            password: hash
        });
        return res.redirect('/post', { message: '가입되었습니다' });
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

module.exports = router;