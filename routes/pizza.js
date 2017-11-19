'use strict'

/**
 * Pizza routes
 * @module PizzaRoutes
 */

/**
 * @requires IngredientModel
 * @requires body-parser
 */
const pizzaModel = require('../models/pizzaModel.js');
const bodyParser = require("body-parser");


module.exports = (router, io, jwt, secret) => {
    router.use(bodyParser.urlencoded({
        extended: true
    }));

    router.use(bodyParser.json());

    /**
     * @function get(/pizza/:id)
     * @description Get a list of all ingredients
     * @returns {PizzaSchema} pizza - pizza in response.pizza if successful
     */
    router.get('/pizza/:id', (req, res) => {
        let id = req.params.id;
        console.log(id);
        // test id format from client
        if (id) {
            pizzaModel.getPizzaById(id, (err, pizza) => {
                if (!err) {
                    console.log(pizza);
                    res.status(200).json({code: 200, response: "Pizza info", pizza: pizza})
                }
                else {
                    res.status(400).json({code: 400, response: err})
                }
            });
        }
        else {
            res.status(400).json({code: 400, response: "Bad  format"})
        }

    });

    /**
     * @function get(/pizza)
     * @description Get a list of all pizzas
     * @returns {Array<PizzaSchema>} pizza - pizza in response.pizza if successful
     */
    router.get('/pizza', function (req, res, next) {
        pizzaModel.getAllPizza((err, pizza) => {
            if (!err) {
                res.status(200).json({code: 200, response: "Pizza info", pizza: pizza})
            }
            else {
                res.status(400).json({code: 400, response: err})
            }
        });
    });



    /**
     * @function post(/pizza)
     * @param {PizzaSchema} pizzaClient - Pizza to create
     * @description Create the given pizza
     * @returns {PizzaSchema} pizza - pizza in Status code 200 and NewPizza event broadcast if successful
     */
    router.post('/pizza', function (req, res, next) {
        let pizzaClient = req.body.pizza;
        pizzaModel.createPizza(pizzaClient, (err, pizza) => {
            if (!err) {
                io.emit('NewPizza',pizza);
                res.status(200).json({code: 200, response: "Pizza created",})
            }
            else {
                res.status(400).json({code: 400, response: err})
            }
        });
    });

    /**
     * @function put(/pizza)
     * @param {PizzaSchema} pizzaClient - Pizza to create
     * @description Create the given pizza
     * @returns {PizzaSchema} pizza - pizza in Status code 200 and UpdatedPizza event broadcast if successful
     */
    router.put('/pizza', function (req, res, next) {
        let pizzaClient = req.body.pizza;
        verifyToken(req.headers.authorization, res, ()=>{
            pizzaModel.updatePizza(pizzaClient, (err, pizza) => {
                if (!err) {
                    io.emit('UpdatedPizza',pizza);
                    res.status(200).json({code: 200, response: "Pizza info", pizza: pizza})
                }
                else {
                    res.status(400).json({code: 400, response: err})
                }
            });
        })
    });

    /**
     * @function delete(/pizza/:id)
     * @param {String} id - Id of the pizza to delete
     * @description Delete the given pizza
     * @returns {String} id - id in Status code 200 and RemovedPizza event broadcast if successful
     */
    router.delete('/pizza', function (req, res, next) {
        let pizzaId = req.body.id;
        verifyToken(req.headers.authorization, res, ()=> {
            pizzaModel.deletePizza(pizzaId, (err, pizza) => {
                if (!err) {
                    io.emit('RemovedPizza', pizzaId);
                    res.status(200).json({code: 200, response: "Pizza deleted",})
                }
                else {
                    res.status(400).json({code: 400, response: err})
                }
            });
        });
    });

    /**
     * @function verifyToken
     * @param {String} token - Jwt token to verify
     * @param {function} callback - Callback function
     * @description Verify the jwt token
     */
    let verifyToken = (token, res, callback) => {
        jwt.verify(token, secret, (err) =>{
            if(err){
                console.log(err);
                res.status(400).json({code:400, response: "Expired Token, please login"});
            }
            else
                callback();
        });
    }
};
