const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
    try {
        res.json({ message: "success" });
    } catch (err) {
        console.error(err);
        res.json({ message: "fail" });
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { userid, password } = req.body;
        const exUser = await User.findOne({ where: { userid } });
        if (exUser) {
            return res.json({ message: '이미 가입된 계정입니다' });
        }

        const hash = await bcrypt.hash(password, 12);
        await User.create({
            userid,
            password: hash
        });
        return res.json({ message: '가입되었습니다' });
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

module.exports = router;