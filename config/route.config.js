(function() {
    'use strict';

    var express = require('express');
    var router = express.Router();
    var jwt = require('jsonwebtoken');
    var config = require('../config/env.config.json')[process.env.NODE_ENV || 'production'];

    var gulp = require('gulp');
    var jshint = require('gulp-jshint');

    router.use(require('../app/controllers/user.controller'));

    router.use(require('../app/controllers/transaction.controller'));
    


    /* GET home page. */
    router.get('/', function(request, response) {
        response.json({
            mensagem: 'Server up and running'
        });
    });
    gulp.task('lint', function() {
        return gulp.src('./lib/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter('gulp-jshint-jenkins-reporter', {
                filename: __reports + '/jshint-checkstyle.xml',
                level: 'e',
                base: 'src/',
                sourceDir: 'path/to/repo/'
            }));
    });

    module.exports = router;
}());
