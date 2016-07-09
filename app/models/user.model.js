(function() {
   'use strict';

    var mongoose = require('mongoose');
    var schema = mongoose.Schema;

    var gulp = require('gulp');
    var jshint = require('gulp-jshint');

    function nameValidator(name) {
        return name === '' || name === undefined;
    }

    // TODO fazer hash na senha http://blog.matoski.com/articles/jwt-express-node-mongoose/

    var user = new schema({
        fullname: {
            type: String
        },
        cpfcnpj: {
            type: Number,
            requided:true,
            unique: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        login: {
            type: String,
            required: true
        },
        password: {
            type: String,
            requided:true
        }
    });

    module.exports = mongoose.model('User', user);
}());