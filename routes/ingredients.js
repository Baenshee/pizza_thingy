'use strict'

/**
 * Ingredient routes
 * @module IngredientRoutes
 */

/**
 * @requires IngredientModel
 * @requires body-parser
 */
const ingredientModel = require('../models/ingredientsModel.js');
const bodyParser = require("body-parser");

module.exports = (router, io) => {
    router.use(bodyParser.urlencoded({
        extended: true
    }));

    router.use(bodyParser.json());

    /**
     * @function get(/ingredient)
     * @description Get a list of all ingredients
     * @returns {Array<IngredientSchema>} ingredients - ingredients in response.ingredient if successful
     */
    router.get('/ingredient', function (req, res, next) {
        ingredientModel.getAllIngredient((err, ingredient) => {
            if (!err) {
                res.status(200).json({code: 200, response: "Ingredient info", ingredient: ingredient})
            }
            else {
                res.status(400).json({code: 400, response: err})
            }
        });
    });

    /**
     * @function get(/ingredient/:id)
     * @param {string} id - Id of the ingredient to get
     * @description Get a the ingredient associated with the given id
     * @returns {IngredientSchema} ingredient - ingredient in response.ingredient if successful
     */
    router.get('/ingredient/:id', (req, res) => {
        let id = req.params.id;
        console.log(id);
        ingredientModel.getIngredientById(id, (err, ingredient) => {
            if (!err) {
                res.status(200).json({code: 200, response: "Ingredient info", ingredient: ingredient})
            }
            else {
                res.status(400).json({code: 400, response: err})
            }
        });
    });

    /**
     * @function post(/ingredient)
     * @param {IngredientSchema} ingredientClient - Ingredient to create
     * @description Create the given ingredient
     * @returns {IngredientSchema} ingredient - ingredient in Status code 200 and NewIngredient event broadcast if successful
     */
    router.post('/ingredient', function (req, res, next) {

        let ingredientClient = req.body.ingredient;
        console.log(ingredientClient);
        ingredientModel.createIngredient(ingredientClient, (err, ingredient) => {
            if (!err) {
                io.emit('NewIngredient', ingredient);
                res.status(200).json({code: 200, response: "Ingredient info", ingredient: ingredient})
            }
            else {
                res.status(400).json({code: 400, response: err})
            }
        });
    });

    /**
     * @function put(/ingredient)
     * @param {IngredientSchema} ingredientClient - Ingredient to update
     * @description Update the given ingredient
     * @returns {IngredientSchema} ingredient - ingredient in Status code 200 and UpdatedIngredient event broadcast if successful
     */
    router.put('/ingredient', function (req, res, next) {

        let ingredientClient = req.body.ingredient;
        console.log(ingredientClient);
        ingredientModel.updateIngredient(ingredientClient, (err, ingredient) => {
            if (!err) {
                io.emit('UpdatedIngredient', ingredient);
                res.status(200).json({code: 200, response: "Ingredient info", ingredient: ingredient})
            }
            else {
                res.status(400).json({code: 400, response: err})
            }
        });
    });

    /**
     * @function delete(/ingredient/:id)
     * @param {String} id - Id of the ingredient to delete
     * @description Delete the given ingredient
     * @returns {String} id - id in Status code 200 and RemovedIngredient event broadcast if successful
     */
    router.delete('/ingredient/:id', function (req, res, next) {
        let ingredientId = req.params.id;
        ingredientModel.deleteIngredient(ingredientId, (err, ingredient) => {
            if (!err) {
                io.emit('RemovedIngredient', ingredientId);
                res.status(200).json({code: 200, response: "Ingredient deleted"})
            }
            else {
                res.status(400).json({code: 400, response: err})
            }
        });
    });
};
