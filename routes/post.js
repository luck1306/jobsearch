const express = require('express');
const Post = require('../models/post');
const router = express.Router();

const httpGet = router.get('/post', (req, res) => {
    res.render('post');
});

const httpPost = router.post('/post', async (req, res) => {
    const { name, major, phonenumber, comment } = JSON.parse(req.body);
    const thisPostExist = await Post.findOne({ where: { name } });
    if (thisPostExist) {
        res.json({ success: false, message: '이미 등록했습니다' });
    } else {
        await Post.create({
            name,
            major,
            phonenumber,
            comment
        });
        res.json({ success: true });
    }
});

module.exports = {
    httpGet,
    httpPost
};