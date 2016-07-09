(function() {
   'use strict';

    var mongoose = require('mongoose');
    var schema = mongoose.Schema;

    var transaction = new schema({
        amount: {
            type: Number,
            required: true
        },
        choice:{
            type: String,
            required: true
        },
        fkUser: {
            type: String,
            requided:true
        },
        mad: {
            type: String,
            required: true
        },
        parcelNumber: {
            type: Number,
            required: true
        },
        portionsNumber: {
            type: Number,
            required: true
        },
        transactionDate: {
            type: Date,
            required: true
        }
    });

    module.exports = mongoose.model('Transaction', transaction);
}());