const express = require('express');
const Post = require('../models/post');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        res.json({ message: true });
    } catch (err) {
        console.error(err);
        res.json({ message: false });
    }
});

router.get('/reqlist', async (req, res) => {
    try {
        const postInfo = await Post.findAll({});
        res.json(postInfo);
    } catch (err) {
        console.error(err);
        res.json({ message: '조회 중 오류 발생' });
    }
});

router.get('/:phonenumber/watchpost', async (req, res) => {
    try {
        const posting = await Post.findOne({ where: { phonenumber: req.params.phonenumber } });
        res.json(posting);
    } catch (err) {
        console.error(err);
        res.json({ message: '조회 중 오류 발생' });
    }
});

module.exports = router;
//