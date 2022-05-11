const express = require('express');

const controllers = require("./controllers/controllers")

const router = express.Router();

router.get('/', async (req, res) => res.json({
    message: "Hello World"
}));

router.get('/salas', controllers.getSalas);

module.exports = router;
