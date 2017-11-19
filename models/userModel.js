'use strict';

/**
 * Pizza Schema
 * @module PizzaSchema
 */

/**
 * @requires Schema
 */
const mongoose = require('mongoose'),
    schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/pizza');

/**
 * @class UserSchema
 * @param {String} username - Username of the user
 * @param {String} password - Hashed password of the user
 * @return {Schema}
 */
let userSchema = mongoose.model('User',{
    username:{
        type: String,
        unique: true,
        dropDups: true
    },
    password: {
        type: String
    }
});

let exp = () => {};

/**
 * @function connect
 * @param {function} username - Username of the user
 * @param {function} callback - Callback function
 * @description Get the user associated with the given username for connection purposes
 */
exp.connect = (username, callback) => {
    userSchema.findOne({
        username: username
    }, function(err, user) {
        if (err) console.log (err);
        callback(err, user);
    });
}

/**
 * @function createUser
 * @param {function} schema - User to be created
 * @param {function} callback - Callback function
 * @description Stores the given user in our database
 */
exp.createUser = (schema, callback) => {
    let tmp = new userSchema(schema);
    tmp.save((err, data) => {
        if (err)
            console.log(err);
        callback(err, data);
    });
}

/**
 * @function updateUser
 * @param {function} schema - User to be created
 * @param {function} callback - Callback function
 * @description Updates the given user in our database
 */
exp.updateUser = (schema, callback) => {
    let id = schema._id;
    userSchema.update({"_id":id}, schema,(err, data) => {
        if (err)
            console.log(err);
        callback(err, data);
    });
}

//Collection drop function for testing purposes
exp.remove = (callback) => {
    userSchema.remove({}, err => {
        if(err){
            console.log(err);
        }
        callback(err);
    })
}

module.exports = exp;
