const express = require('express');
const passport = require('passport');

const router = express.Router();

// Get/ Auth Google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// Get/ Auth Google callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res, next) => {
    if (req.user) {
        req.session.isLoggedIn = true;
    }
    res.redirect('/')
})

module.exports = router;