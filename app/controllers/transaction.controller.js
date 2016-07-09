(function() {
    'use strict';

    var express = require('express');
    var router = express.Router();

    var mongoose = require('mongoose');

    var transactionService = require('../services/transaction.service');  

    var Transaction = require('../models/transaction.model');  

    router.get('/gettransactions', transactionService.getTransactions);

    router.post('/addtransaction', transactionService.newTransaction);

    router.post('/gettransactionsbyuserid', transactionService.getTransactionsByUserId);

    router.get('/getTransactionsBySaleType', transactionService.getTransactionsBySaleType);

    router.get('/getTransactionsByMonth', transactionService.getTransactionsByMonth);

    module.exports = router;
}());