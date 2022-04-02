const express = require('express');
const User = require('../models/user');
const Post = require('../models/post');
const passport = require('passport');
const bcrypt = require('bcrypt');
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

router.get('/join', async (req, res) => {
    const s = await User.findAll({}); // post는 reqlist 들어가면 테이블 알아서 생성됬는데 얘는 도대체 왜 제발 뭐때문인데 내가 따로 mysql들어가서 만들어주기도 했잖아 왜 제발 나한테 이러지마세
    res.render('join', { s });
});

router.post('/join', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const exUser = User.findOne({ where: { username } });
        if (exUser) {
            res.redirect('/login', { message: '이미 가입되어있습니다' });
        }

        const hash = bcrypt.hash(password, 12);
        await User.create({
            username,
            password: hash
        });
        return res.redirect('/login', { message: '가입되었습니다' });
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res, next) => {
    passport.Authenticator('local', (loginError, user, info) => {
        if (loginError) {
            console.error(loginError);
            next(loginError);
        }
        if (!user) {
            res.redirect('error', info);
        }
        return req.login(user, (err) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            res.redirect('/');
        })
    })
});

router.get('/logout', (req, res) => {
    req.logOut();
    req.session.destroy();
    res.redirect('/');
})

module.exports = router;