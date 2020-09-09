const express = require('express');

const router = express.Router();

const Song = require('../models/Song');

// Get/ add-song
router.get('/add-song', async(req, res, next) => {
    try {
        const songs = await Song.find({ user: req.user.id }).lean();
        res.render('songs/add-song', {
            name: req.user.firstName
        })
    } catch (error) {
        console.log(error);
    }
});

// Get/ songs
router.get('/songs-list', async(req, res, next) => {
    try {
        const songs = await Song.find({ user: req.user.id }).lean();
        res.render('songs/songs-list', {
            name: req.user.firstName,
            songs: songs
        })
    } catch (error) {
        console.log(error);
        res.render('errors/500')
    }
});

// POST/ songs
router.post('/', async(req, res, next) => {
    try {
        req.body.user = req.user.id;
        await Song.create(req.body);
        res.redirect('/songs/songs-list')
    } catch (error) {
        console.log(error);
        res.render('errors/500')
    }
});

module.exports = router;