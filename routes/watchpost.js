const express = require('express');
const router = express.Router();

router.get('/watchpost', (req, res) => {
    res.render('watchpost');
});

module.exports = router;