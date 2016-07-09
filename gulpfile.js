(function() {
    'use strict';

    var gulp = require('gulp'),
        nodemon = require('gulp-nodemon'),
        watch = require('gulp-watch'),
        jshint = require('gulp-jshint'),
        livereload = require('gulp-livereload'),
        _paths = ['server/**/*.js', 'client/js/*.js'],
        _jsPaths = ['*.js', './app/controllers/*.js', './app/models/*.js', './app/services/*.js'];

    //register nodemon task
    gulp.task('nodemon', function() {
        nodemon({
                script: 'index.js',
                env: {
                    'NODE_ENV': 'production'
                }
            })
            .on('restart');
    });

    // Rerun the task when a file changes
    gulp.task('watch', function() {
        livereload.listen();
        gulp.src(_paths, {
                read: false
            })
            .pipe(watch({
                emit: 'all'
            }))
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
        watch(_paths, livereload.changed);
    });

    //lint js files
    gulp.task('lint', function() {
        return gulp.src(_jsPaths)
            .pipe(jshint())
            .pipe(jshint.reporter('gulp-checkstyle-jenkins-reporter'))
            .pipe(jshint.reporter('default', {
                verbose: true,
                level: 'ewi'
            }));
    });

    // The default task (called when you run `gulp` from cli)
    gulp.task('default', ['lint', 'nodemon', 'watch']);
}());
