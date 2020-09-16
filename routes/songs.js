const express = require('express');

const router = express.Router();

const Song = require('../models/Song');

const { ensureAuth } = require('../middleware/is-auth');
const { findOneAndUpdate } = require('../models/Song');

// Get/ add-song
router.get('/add-song', ensureAuth, async(req, res, next) => {
    try {
        const songs = await Song.find({ user: req.user.id }).lean();
        res.render('songs/add-song', {
            name: req.user.firstName
        })
    } catch (error) {
        console.log(error);
    }
});

// Get/ /songs/edit/:id
router.get('/edit/:id', ensureAuth, async(req, res, next) => {
    try {
        const song = await Song.findOne({ _id: req.params.id }).lean();
        if (!song) {
            return res.render('errors/404');
        } else {
            res.render('songs/edit-song', {
                song
            })
        }
    } catch (error) {
        console.log(error);
    }
});

// PUT/ /songs/:id
router.put('/:id', ensureAuth, async(req, res, next) => {
    try {
        let song = await Song.findById(req.params.id).lean();
        if (!song) {
            return res.render('errors/404');
        } else {
            song = await Song.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true
            })
        }
        res.redirect('/songs/user-songs')
    } catch (error) {
        console.log(error);
        return res.render('errors/500');
    }
});

// DELETE/ /songs/:id
router.delete('/:id', ensureAuth, async(req, res, next) => {
    try {
        await Song.remove({ _id: req.params.id });
        res.redirect('/songs/user-songs')
    } catch (error) {
        console.log(error);
        return res.render('errors/500');
    }
});

// Get/ songs
router.get('/songs-list', async(req, res, next) => {
    try {
        const songs = await Song.find().populate('user').sort({ createdAt: 'desc' }).lean();
        res.render('songs/songs-list', {
            songs: songs
        })
    } catch (error) {
        console.log(error);
        res.render('errors/500')
    }
});

// Get/ user songs
router.get('/user-songs', ensureAuth, async(req, res, next) => {
    try {
        const songs = await Song.find({ user: req.user.id }).lean();
        res.render('songs/user-songs', {
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