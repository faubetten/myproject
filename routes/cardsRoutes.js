const express = require('express');
const router = express.Router();
const Card = require("../models/cardsModel");
const { body, validationResult } = require('express-validator'); /* Importa validador de parametros do express */
const { filterByType, filterByLoreOrDescription } = require('../models/cardsModel');
          
router.get('/', async function(req, res, next) {
    try { 
        console.log("Get all cards");
        let result = await Card.getAll();
        res.status(result.status).send(result.result);
    } catch(err) {
        console.log(err);
        /* Error de Crash */
        res.status(500).send(err);
    }
});

/* (\\d+) aceita so numeros decimais atraves do express */
router.get('/:id(\\d+)', async function(req, res, next) { /* Retira-se variavel dos parametros do URL */
    try { 
        console.log("Get card with id "+req.params.id);

        /* Validador do input do utilizador */
        const valid = validationResult(req);
        if (!valid.isEmpty()) {
            return res.status(400).json(valid.array());
        }
        let result = await Card.getById(req.params.id);
        res.status(result.status).send(result.result);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
  });


router.post("/", 
    body('name').isLength({ min: 4, max: 60 })
        .withMessage('Name must have between 4 and 60 characters'),
    body('level').isInt({ min: 0 })
        .withMessage('Level must be a non negative integer number'),
    body('type').isInt({ min: 1 })
        .withMessage('Type must be a positive integer number'),
    async function (req, res, next) {
        try {
            console.log("Save card with name " + req.body.name);

            const valid = validationResult(req);
            if (!valid.isEmpty()) {
                return res.status(400).json(valid.array());
            }
            let result = await Card.save(req.body);
            res.status(result.status).send(result.result);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    });


/* localhost:8080/api/cards/filter?variavel=valor */
/* So faz 1 filtro de cada vez */
router.get('/filter', async function(req,res,next){
    try {
        console.log("Filter cards");
        const valid = validationResult(req);
        if(!valid.isEmpty){
            return res.status(400).json(valid.array());
        }
        if(req.query.typeId){
            let result = await Card.filterByType(req.query.typeId);
            res.status(result.status).send(result.result);
        }
        else if (req.query.descContains){
            let result = await Card.filterByLoreOrDescription(req.query.descContains);
            res.status(result.status).send(result.result);
        }
        else{
            res.status(400).send({ msg: "No filter provided"});
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
        
    }
})


    
    
          
module.exports = router;