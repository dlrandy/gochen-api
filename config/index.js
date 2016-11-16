var logger = require('morgan'),
    cors = require('cors'),
    jwt = require('jsonwebtoken'),
    express = require('express'),
    bodyParser = require('body-parser'),
    promise = require('bluebird'),
    postgresql_promise = require('pg-promise'),
    Sequelize = require('sequelize');

exports.parsers = function(app) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());
}

exports.log = function(app) {
    if (process.env.NODE_ENV == 'development') {
        app.use(logger('env'));
    }
}

exports.db = function(app) {
    var sequelize = new Sequelize('postgres', 'Administrator', '123456', {
        host: 'localhost',
        dialect: 'postgres',

        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    });

    return sequelize;
}


exports.authentication = function(app) {
    app.use(function(req, res, next) {
        var token = req.body.token ||
            req.query.token ||
            req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, process.env.AUTH0_CLIENT_SECRET, function(err, user) {
                if (err) {
                    return res.status(401).json({ success: false, 
                    	message: 'Failed to authenticate token.' });
                } else {
                    req.user = user;
                    next();
                }
            })
        } else {
            next();
        }
    });
}



// exports.db = function(app) {
// var options = {
// 	promiseLib: promise
// };
// var pgp = postgresql_promise(options);
// var config = {
//    	host: 'localhost', 
//    	port: 5432, 
//    	database: 'postgres',
//    	user: 'Administrator',
//    	password: 123456
// };
// var db = pgp(config);
// }
