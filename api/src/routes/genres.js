const { key } = process.env;
const { Router } = require('express');
const router = Router();
const { Genre } = require('../db');
const axios = require('axios');
//console.log(key);
const url = `https://api.rawg.io/api/genres?key=${key}`;
//console.log(url);

router.get('/', async (req, res, next) => {
    try {
        let genres = await axios.get(url);
        genres = genres.data.results;
        genres.forEach(e => {
            Genre.findOrCreate({
                where: {
                    name: e.name}
            })
        });
        const allGenres = await Genre.findAll();
        res.send(allGenres);
    }
    catch(e) {
        next(e);
    }
});

module.exports = router
