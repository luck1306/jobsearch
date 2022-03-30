const express = require('express');
const Post = require('../models/post');
const router = express.Router();

router.post('/post.js', async (req, res) => {
    const { name, major, phonenumber, comment } = JSON.parse(req.body); // req.body부분에 post정보 넣어
    const thisPostExist = await Post.findOne({ where: { name } });
    if (thisPostExist) {
        res.json({ success: false, message: '이미 등록했습니다' }); // 이부분은 alert으로 표현
    } else {
        await Post.create({
            name,
            major,
            phonenumber,
            comment
        });
        res.json({ success: true }); // 마지막 페이지는 따로 만들어서
    }
});

module.exports = router;