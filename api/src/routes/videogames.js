require('dotenv').config();
const { key } = process.env;
const { Router } = require('express');
const router = Router();
const { Videogame, Genre } = require('../db');
const axios = require('axios');
const { Op } = require("sequelize");

const url = `https://api.rawg.io/api/games?key=${key}`;

const getApiInfo = async () => {
    try {
        let Page1 = axios.get(`${url}&page=1`);
        let Page2 = axios.get(`${url}&page=2`);
        let Page3 = axios.get(`${url}&page=3`);
        let Page4 = axios.get(`${url}&page=4`);
        let Page5 = axios.get(`${url}&page=5`);

        let allPages = await Promise.all([Page1, Page2, Page3, Page4, Page5]);

        //Entro a los datos de la api con data.results
        Page1 = allPages[0].data.results;
        Page2 = allPages[1].data.results;
        Page3 = allPages[2].data.results;
        Page4 = allPages[3].data.results;
        Page5 = allPages[4].data.results;

        //concateno todos los datos de las paginas en un solo array
        let apiHtml = Page1.concat(Page2).concat(Page3).concat(Page4).concat(Page5);

        let ApiInfo = apiHtml.map(p => {
            return {
                id: p.id,
                name: p.name,
                image: p.background_image,
                //description: p.description,
                //released: p.released,
                rating: p.rating,
                platforms: p.platforms.map((e) => e.platform.name),
                genres: p.genres.map((e) => e.name),
                created: false
            }
        })
        return ApiInfo;
    }catch (error){
        console.log(error);
    }
};

const getDbInfo = async () => {
    const infoDB = await Videogame.findAll({
            include: [{
                model: Genre,
                attributes: ['name'],
                through: {
                attributes: [],
                },
            }],
            attributes: ["id","name","image","rating", "created"]
    });
    return infoDB;
}

const getAllGames = async () => {
    try {
        const apiInfo = await getApiInfo();
        const dbInfo = await getDbInfo();
        const infoTotal = apiInfo.concat(dbInfo);
        return infoTotal;
    } catch (error) {
        console.log(error);
    }
};


const getGameByIdApi = async (id) => {
    const apiUrl = await axios.get(`https://api.rawg.io/api/games/${id}?key=${key}`);
    const gameData = {
        id: apiUrl.data.id,
        name: apiUrl.data.name,
        image: apiUrl.data.background_image,
        genres: apiUrl.data.genres.map(e => e.name),
        description: apiUrl.data.description.replace(/<[^>]+>/g, ''),
        released: apiUrl.data.released,
        rating: apiUrl.data.rating,
        platforms: apiUrl.data.platforms.map(e => e.platform.name)
    };
    return gameData;
};

const getGameByNameApi = async (name) => {
    try {
        const apiNames = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${key}`);
        const apiNamesData = apiNames.data.results.map(e => {
            return {
                id: e.id,
                name: e.name,
                image: e.background_image,
                genres: e.genres.map(e => e.name),
                rating: e.rating
            }
        });
        let array = [];
        if(apiNamesData.length > 15){
            for(let i = 0; i <= 14; i++){
                array.push(apiNamesData[i]);
            }
            return array;
        }
        return apiNamesData;
    }catch(e){
        console.log(e);
    }
};

const getGameByNameBd = async (name) => {
    try {
        const games = await Videogame.findAll({
            where: {
                name: { [Op.iLike]: `%${name}%` }
            },
            include: [{
                model: Genre,
                attributes: ['name'],
                through: {
                attributes: [],
                },
            }],
            attributes: ["id","name","image", "rating"]
        });
        return games;
    }catch(e){
        console.log(e);
    }
};



const getByNameTotal = async (name) => {
    try{
        const apiName = await getGameByNameApi(name);
        const dbName = await getGameByNameBd(name);
        const totalNames = apiName.concat(dbName);
        return totalNames;
    }catch(error){
        console.log(error)
    }
}


//------------------------------------------------------------------------------------------------
//                   RUTAS
//------------------------------------------------------------------------------------------------

router.get('/', async (req, res) => {
    const name = req.query.name;
    const gamesAll = await getAllGames();
    //const gamesByName = await getGameByNameApi(name);
    //const gamesByName = await getGameByNameBd(name);
    const gamesByName = await getByNameTotal(name);
    if (name) {
        const gamesName = await gamesByName.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
        gamesName.length?
            res.status(200).send(gamesName) :
            res.status(404).send('EL JUEGO BUSCADO NO EXISTE');
    }else{
        res.status(200).send(gamesAll)
    }
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        if(isNaN(id)){
            const player = await Videogame.findByPk(id, {
                include: {
                        model: Genre,
                        attributes: ["name"],
                        through: {
                        attributes: [],
                        }
                }
            })
            res.json(player);
        }else{
            res.json(await getGameByIdApi(id));
        }
    }catch(err) {
        console.log(err)
    }
});


router.post('/', async (req, res, next)=>{
    const { name, image, description, released, rating, platforms, genres } = req.body;
    try{
        const newVideogame = await Videogame.create({ name, image, description, released, rating, platforms });
        const genreDb = await Genre.findAll({
            where: {
                name: genres}
        });
        newVideogame.addGenre(genreDb)
        res.send('El juego se creó exitosamente')
    }catch(error){
        next(error)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        Videogame.destroy({where: {id}});
        res.send('The game was successfully deleted');
    }
    catch (error) {
        next(error);
    }
})

module.exports = router
