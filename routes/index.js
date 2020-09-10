const express = require('express');

const router = express.Router();

// Get/ Home Page
router.get('/', (req, res, next) => {
    res.render('home')
});

// Get/ Home Page
router.get('/login', (req, res, next) => {
    res.render('login')
});

// Get/ Log out
router.get('/logout', (req, res, next) => {
    req.logout();
    if (!req.user) {
        req.session.isLoggedIn = false;
    }
    res.redirect('/');
});

module.exports = router;