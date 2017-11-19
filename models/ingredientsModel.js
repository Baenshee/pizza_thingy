'use strict';

/**
 * Ingredient Model
 * @module IngredientModel
 */

/**
 * @requires Schema
 */
const mongoose = require('mongoose'),
    schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/pizza');

/**
 * @class IngredientSchema
 * @param {String} name - Name of the ingredient (Required)
 * @param {Number} weight - Weight of the ingredient
 * @param {Number} price - Price of the ingredient
 */
let ingredientSchema = mongoose.model('Ingredient',{
    name:{
        required: true,
        type: String,
        unique: true
    },
    weight: {
        type: Number
    },
    price:{
        type: Number
    }
});

let exp = () => {};

/**
 * @function getIngredientById
 * @param {String} id - Id of the ingredient to get
 * @param {function} callback - Callback function
 * @description Get the ingredient with the given id
 */
exp.getIngredientById = (id, callback) => {
    ingredientSchema.findOne({ "_id": id }, (err, data) => {
        if (err)
            console.log(err);
        callback(err, data);
    });
}

/**
 * @function getAllIngredient
 * @param {function} callback - Callback function
 * @description Get a list of all ingredients
 */
exp.getAllIngredient = (callback) => {
    ingredientSchema.find((err, data) => {
        if (err)
            console.log(err);
        callback(err, data);

    });
}

/**
 * @function createIngredient
 * @param {Ingredient} schema - Ingredient to be created
 * @param {function} callback - Callback function
 * @description Stores the given ingredient in our database
 */
exp.createIngredient = (schema, callback) => {
    let tmp = new ingredientSchema(schema);
    tmp.save((err, data) => {
        if (err)
            console.log(err);
        callback(err, data);
    });
}

/**
 * @function updateIngredient
 * @param {Ingredient} schema - Ingredient to be created
 * @param {function} callback - Callback function
 * @description Updates the given ingredient in our database
 */
exp.updateIngredient = (schema, callback) => {
    let id = schema._id;
    ingredientSchema.update({"_id": id},schema, (err) => {
        if (err)
            console.log(err);
        callback(err, schema);
    });
}

/**
 * @function deleteIngredient
 * @param {String} id - id of the ingredient to delete
 * @param {function} callback - Callback function
 * @description Removes the given ingredient from our database
 */
exp.deleteIngredient = (id, callback) => {
    ingredientSchema.remove({"_id": id},(err, data) => {
        if (err)
            console.log(err);
        callback(err, data);
    });
}

//Collection drop function for testing purposes
exp.remove = (callback) => {
    ingredientSchema.remove({}, err => {
        if(err){
            console.log(err);
        }
        callback(err);
    })
}

module.exports = exp;
