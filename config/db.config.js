(function() {
    'use strict';

    module.exports.init = function(MONGO_URI) {
        var mongoose = require('mongoose');

        mongoose.connect(MONGO_URI);
        var db = mongoose.connection;

        db.on('error', function callback () {
            console.log("Connection error");
        });

        db.once('open', function callback () {
            console.log("Mongo working! At db", db.name);
        });
    };
})();