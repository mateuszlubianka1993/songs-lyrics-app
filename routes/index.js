const express = require('express');

const router = express.Router();

// Get/ Home Page
router.get('/', (req, res, next) => {
    res.render('home')
});

module.exports = router;