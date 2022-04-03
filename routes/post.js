const express = require('express');
const Post = require('../models/post');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('post');
});

router.post('/', async (req, res) => {
    const { name, major, phonenumber, comment } = req.body;
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

module.exports = router;