'use strict'

/**
 * User routes
 * @module UserRoutes
 */

/**
 * @requires UserModel
 * @requires body-parser
 * @requires crypto
 */
const userModel = require('../models/userModel.js');
const bodyParser = require("body-parser"),
    crypto = require('crypto');

module.exports = (router, jwt, secret) => {
    router.use(bodyParser.urlencoded({
        extended: true
    }));

    router.use(bodyParser.json());

    /**
     * @function post(/user)
     * @param {String} username - Username to use to connect
     * @param {String} password - Password to use to connect
     * @description Connects the given user
     * @returns {String} token - jwt token created for the user. Expires after 60 minutes
     */
    router.post('/user', function (req, res) {
        let user = {};
        user.username = req.body.username;
        user.password = crypto.createHmac('sha256', secret)
            .update(req.body.password)
            .digest('hex');
        userModel.connect(user.username, user.password, (err, user) => {
            if (!user) {
                res.json({success: false, message: 'Authentication failed. Wrong user/password combination.'});
            } else {
                const payload = {
                    admin: user.admin
                };
                let token = jwt.sign(payload, secret, {
                    expiresIn: '60m'
                });
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }
        });
    });

    /**
     * @function put(/user)
     * @param {UserSchema} user - User to create or update
     * @description Create or update the given User
     * @returns Status code 200 if successful
     */
    router.put('/user', function (req, res) {
        let userClient = {};
        if (!req.body.username || !req.body.password) {
            res.status(400).json({code: 400, response: "Bad Request"});
        }
        else {
            userClient.username = req.body.username;
            userClient.password = crypto.createHmac('sha256', secret)
                .update(req.body.password)
                .digest('hex');
            console.log(userClient);
            if (req.body.user_id) {
                userModel.updateUser(userClient, (err) => {
                    if (!err) {
                        res.status(200).json({code: 200, response: "User updates"})
                    }
                    else {
                        res.status(400).json({code: 400, response: err})
                    }
                });
            }
            else {
                userModel.createUser(userClient, (err) => {
                    if (err) {
                        res.status(400).json({code: 400, response: "error adding user"});
                    }
                    else {
                        res.status(200).json({code: 200, response: "User created"});
                    }
                });
            }
        }
    });

    router.get('/token', (req, res) =>{
        jwt.verify(req.headers.authorization, secret, (err, token)=>{
           if(err){
               console.log(err);
               res.end();
           }
           else{
               console.log(token);
               res.send(token);
           }
        });
    });
};
