const express = require('express');
const postgetRouter = require('./postget');
const postpostRouter = require('./postpost');
const reqListRouter = require('./reqlist');
const watchPostRouter = require('./watchpost');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/post', postgetRouter);
router.post('/post', postpostRouter);

router.get('/reqlist', reqListRouter);

router.get('/watchpost', watchPostRouter);

module.exports = router;