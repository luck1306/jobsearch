const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/reqlist', async (req, res) => {
    const postInfo = await Post.findAll({});
    const postInfoMajor = await postInfo.map(i => i.major);
    res.render('reqlist', { postInfo: postInfoMajor });
});

module.exports = router;