const express = require('express');

const router = express.Router();

// Get/ Home Page
router.get('/login', (req, res, next) => {
    res.render('login')
});

module.exports = router;