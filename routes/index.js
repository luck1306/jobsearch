const express = require('express');
const Post = require('../models/post');
const postRouter = require('./post');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/post', postRouter.httpGet);
router.post('/post', postRouter.httpPost);

router.get('/reqlist', async (req, res) => {
    const postInfo = await Post.findAll({});
    res.render('reqlist', { postInfo });
});

router.get('/:phonenumber/watchpost', async (req, res) => {
    const posting = await Post.findOne({ where: { phonenumber: req.params.phonenumber } });
    res.render('watchpost', { posting });
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login')

module.exports = router;