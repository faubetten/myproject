const express = require('express');
const router = express.Router();
const Card = require("../models/cardsModel");
const { body, validationResult } = require('express-validator'); /* Importa validador de parametros do express */
          
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
          
module.exports = router;