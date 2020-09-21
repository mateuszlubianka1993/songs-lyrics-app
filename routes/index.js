const express = require('express');

const router = express.Router();

const Song = require('../models/Song');

// Get/ Home Page
router.get('/', async(req, res, next) => {
    try {
        const songs = await Song.find().populate('user').sort({ _id: -1 }).limit(5).lean();
        res.render('home', {
            songs: songs
        })
    } catch (error) {
        console.log(error);
        res.render('errors/500')
    }
});

// Get/ Home Page
router.get('/login', (req, res, next) => {
    res.render('login')
});

// Get/ Log out
router.get('/logout', (req, res, next) => {
    req.logout();
    if (!req.isAuthenticated()) {
        req.session.isLoggedIn = false;
    }
    res.redirect('/');
});

module.exports = router;