const express = require('express');
const Post = require('../models/post');
const router = express.Router();

router.post('/post', async (req, res) => {
    const { name, major, phonenumber, comment } = JSON.parse(req.body); // req.body부분에 post정보 넣어
    const thisPostExist = await Post.findOne({ where: { name } });
    if (thisPostExist) {
        res.render('endpage', { result: false }); // 이부분은 alert으로 표현
    } else {
        await Post.create({
            name,
            major,
            phonenumber,
            comment
        });
        res.render('endpage', { result: true }); // 마지막 페이지는 따로 만들어서
    }
});

module.exports = router;