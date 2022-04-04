const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
    res.render('join');
});

router.post('/', async (req, res, next) => {
    try {
        const { userid, password } = req.body;
        const exUser = await User.findOne({ where: { userid } });
        if (exUser) {
            return res
                //  .redirect('/login')
                .json({ message: '이미 가입된 계정입니다' });
        }

        const hash = await bcrypt.hash(password, 12);
        await User.create({
            userid,
            password: hash
        });
        return res
            // .redirect('/post')
            .json({ message: '가입되었습니다' });
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

module.exports = router;