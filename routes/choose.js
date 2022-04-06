const express = require('express');
const Post = require('../models/post');
const router = express.Router();

router.get('/', (req, res) => {
    res
        .status(200)
        .render('choose');
});

router.get('/reqlist', async (req, res) => {
    const postInfo = await Post.findAll({});
    res.json(postInfo);
});

router.get('/:phonenumber/watchpost', async (req, res) => {
    const posting = await Post.findOne({ where: { phonenumber: req.params.phonenumber } });
    res.json(posting);
});

module.exports = router;