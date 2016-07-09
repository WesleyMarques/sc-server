(function () {
    'use strict';

    var express = require('express');
    var path = require('path');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');

    var app = express();

    var config = require('./config/env.config.json')[process.env.NODE_ENV || 'production'];
    var routes = require('./config/route.config');
    var db = require('./config/db.config');

    var userController = require('./app/controllers/user.controller.js');
    var transactionController = require('./app/controllers/transaction.controller.js');

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(cookieParser());
    
    app.use(function(req, res, next) { 
	    res.header("Access-Control-Allow-Origin", "*"); 
	    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	    next();
    });
    app.use('/', routes);
    app.set('port', process.env.PORT || config.PORT);
    db.init(config.MONGO_URI);

    var server = app.listen(app.get('port'), function () {
        console.log('Express server listening on port ' + server.address().port);
    });

    //validate fields here or in the service?

    module.exports = app;
}());
