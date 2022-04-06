const express = require('express');
const Post = require('../models/post');
const router = express.Router();

router.get('/', async (req, res, next) => {
    await Post.findOne({ where: { postingid: req.user.id } })
        .then((user) => { res.json(user) })
        .catch((err) => next(err));
});

router.post('/', async (req, res) => {
    try {
        const { name, major, phonenumber, comment } = req.body;
        const thisPostExist = await Post.findOne({ where: { postingid: req.user.id } });
        if (thisPostExist) {
            await Post.update({
                name,
                major,
                phonenumber,
                comment
            }, {
                where: {
                    postingid: thisPostExist.postingid
                }
            });
        } else {
            await Post.create({
                name,
                major,
                phonenumber,
                comment,
                postingid: req.user.id,
            }).then((user) => { res.json(user); })
                .catch(consoel.error);
        }
    } catch (err) {
        console.error(err);
    }
});

router.delete('/:phonenumber', async (req, res, next) => {
    await Post.destroy({ where: { phonenumber: req.params.phonenumber } })
        .then(() => { res.redirect('/choose'); })
        .catch((err) => { console.error(err); next(err); });
});

module.exports = router;