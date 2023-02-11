const express = require('express');
const router = express.Router();
const Card = require("../models/cardsModel");
          
router.get('/', async function(req, res, next) {
    try { 
        console.log("Get all cards");
        let result = await Card.getAll();
        res.status(result.status).send(result.result);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.get('/:id', async function(req, res, next) { /* Retira-se variavel dos parametros do URL */
    try { 
        console.log("Get card with id "+req.params.id);
        let result = await Card.getById(req.params.id);
        res.status(result.status).send(result.result);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
  });
          
module.exports = router;