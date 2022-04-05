const express = require('express');
const User = require('../models/user');
const Post = require('../models/post');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('post');
});

router.post('/', async (req, res) => {
    try {
        const exLogin = req.get('login');
        if (exLogin) {
            await User.findOne({ where: { id: 4 } })
                .then((user) => { req.login(user) })
                .catch((err) => { console.error(err) });
        }
        const { name, major, phonenumber, comment } = req.body;
        const thisPostExist = await Post.findOne({ where: { postingid: req.user.id } });
        if (thisPostExist) {
            res.json({ success: false });
        } else {
            await Post.create({
                name,
                major,
                phonenumber,
                comment,
                postingid: req.user.id,
            }).then((user) => { res.json(user); })
                .catch(consoel.error);
        }
    } catch (err) {
        console.error(err);
    }
});

router.post('/:phonenumber', async (req, res) => {
    await Post.destroy({ where: { phonenumber: req.params.phonenumber } })
        .then(() => { res.redirect('/') })
        .catch((err) => { next(err) });
});

module.exports = router;