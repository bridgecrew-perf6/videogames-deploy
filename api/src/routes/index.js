const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const VideogamesRoute = require('./videogames');
const GenresRoute = require('./genres');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', VideogamesRoute);
router.use('/genres', GenresRoute);

module.exports = router;
