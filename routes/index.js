const express = require('express');

const router = express.Router();

const Song = require('../models/Song');

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
    res.redirect('/');
});

// Get/ add-song
router.get('/add-song', async(req, res, next) => {
    try {
        const songs = await Song.find({ user: req.user.id }).lean();
        res.render('add-song', {
            name: req.user.firstName
        })
    } catch (error) {
        console.log(error);
    }
});

// Get/ songs
router.get('/songs', async(req, res, next) => {
    try {
        const songs = await Song.find({ user: req.user.id }).lean();
        res.render('songs-list', {
            name: req.user.firstName,
            songs: songs
        })
        console.log(songs)
    } catch (error) {
        console.log(error);
        res.render('errors/500')
    }
});

module.exports = router;