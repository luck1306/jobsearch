const express = require('express');
const Post = require('../models/post');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/reqlist', async (req, res) => {
    const postInfo = await Post.findAll({});
    res.render('reqlist', { postInfo });
});

router.get('/:phonenumber/watchpost', async (req, res) => {
    const posting = await Post.findOne({ where: { phonenumber: req.params.phonenumber } });
    res.render('watchpost', { posting });
});

router.get('/logout', (req, res) => {
    req.logOut();
    req.session.destroy();
    res.redirect('/');
})

module.exports = router;