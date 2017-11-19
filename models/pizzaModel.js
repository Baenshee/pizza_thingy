'use strict';

/**
 * Pizza Model
 * @module PizzaModel
 */

/**
 * @requires Schema
 */
const mongoose = require('mongoose'),
    schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/pizza');


/**
 * @class PizzaSchema
 * @param {String} name - Name of the pizza (Requis)
 * @param {String} desc - Description of the pizza
 * @param {Number} price - Price of the pizza
 * @param {Array} ingredients - Ingredients list
 * @param {String} image - Picture of the pizza in base64
 * @param {Date} creationDate - Creation date
 * @param {Date} updateDate - Last update date
 */
let pizzaSchema = mongoose.model('Pizza',{
    name:{
        type: String,
        unique: true
    },
    description: {
        type: String
    },
    price:{
        type: Number
    },
    ingredients: [{
        type: schema.Types.ObjectId, ref:"Ingredient"
    }],
    image : {
        type: String
    },
    creationDate: {
        type: Date
    },
    updateDate:{
        type: Date
    }
});

let exp = () => {};

/**
 * @function getPizzaById
 * @param {String} id - Id of the pizza to get
 * @param {function} callback - Callback function
 * @description Get the pizza with the given id
 */
exp.getPizzaById = (id, callback) => {
    pizzaSchema.findOne({ "_id": id })
        .populate('ingredients')
        .exec((err, data) => {
        if (err)
            console.log(err);
        callback(err, data);

    });
}

/**
 * @function getAllPizza
 * @param {function} callback - Callback function
 * @description Get a list of all pizzas
 */
exp.getAllPizza = (callback) => {
    pizzaSchema.find()
        .populate('ingredients')
        .exec(function (err, data){
            if (err)
                console.log(err);
            callback(err, data);

        });
}

/**
 * @function createPizza
 * @param {Pizza} schema - Pizza to be created
 * @param {function} callback - Callback function
 * @description Stores the given pizza in our database
 */
exp.createPizza = (schema, callback) => {
    schema.creationDate= Date.now();
    let tmp = new pizzaSchema(schema);
    tmp.save((err, data) => {
        if (err)
            console.log(err);
        callback(err, data);
    });
}


/**
 * @function updatePizza
 * @param {Pizza} schema - Pizza to be updated
 * @param {function} callback - Callback function
 * @description Updates the given pizza in our database
 */
exp.updatePizza = (schema, callback) => {
    let id=schema._id;
    schema.updatedDate = Date.now();
    pizzaSchema.update({"_id": id},schema,(err, data) => {
        if (err)
            console.log(err);
        callback(err, data);
    });
}

/**
 * @function deletePizza
 * @param {String} id - id of the pizza to delete
 * @param {function} callback - Callback function
 * @description Removes the given pizza from our database
 */
exp.deletePizza = (id, callback) => {
    pizzaSchema.remove({"_id": id},(err, data) => {
        if (err)
            console.log(err);
        callback(err, data);
    });
}

//Collection drop function for testing purposes
exp.remove = (callback) => {
    pizzaSchema.remove({}, err => {
        if(err){
            console.log(err);
        }
        callback(err);
    })
}

module.exports = exp;
