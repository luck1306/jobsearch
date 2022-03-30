const express = require('express');
const reqListRouter = require('./reqlist');
const watchPostRouter = require('./watchpost');
const postRouter = require('./post');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/post', postRouter.httpGet);
router.post('/post', postRouter.httpPost);

router.get('/reqlist', reqListRouter);

router.get('/watchpost', watchPostRouter);

module.exports = router;