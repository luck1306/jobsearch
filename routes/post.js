const express = require('express');
const Post = require('../models/post');
const router = express.Router();

router.post('/', async (req, res) => {
    const { name, major, phonenumber, comment } = req.body;
    const thisPostExist = await Post.findOne({ where: { phonenumber: phonenumber } }); // postingid: req.user.id
    // console.log(req.user)
    try {
        if (thisPostExist) {
            res
                .json(thisPostExist)
                .render('post');
        } else {
            await Post.create({
                name,
                major,
                phonenumber,
                comment,
                postingid: req.user.id,
            });
            res.json({ success: true });
        }
    } catch (err) {
        console.error(err)
    }
});

router.post('/:phonenumber', async (req, res) => {
    await Post.destroy({ where: { phonenumber: req.params.phonenumber } });
    // const rmPost = await Post.findOne({ where: { phonenumber: req.params.phonenumber } });
    // await rmPost.destroy({}); // 이런식으로 해도 되는가?
    res.redirect('/');
});

module.exports = router;