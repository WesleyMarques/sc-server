(function() {
    'use strict';
    var Transaction = require('../models/transaction.model');

    exports.newTransaction = function(request, response) {
        var transaction = new Transaction(request.body);
        console.log(transaction);
        transaction.save(function(error) {
            if (error) response.status(500).send(error);
            else response.status(200).send("transaction added");
        });

    };

    exports.getTransactions = function(req, res, next) {
        Transaction.find(function(err, transactions) {
            if (err) return next(err);
            res.json(transactions);
        });
    };

    exports.getTransactionsByMonth = function(req, res, next) {
        Transaction.aggregate([{
                $group: {
                    transactionDate: { year: "$transactionDate.year" },
                    byMonths: { $push: { month: "$transactionDate.month", len: "$count" } }
                }
            }],
            function(err, data) {
                if (err) {
                    next(err);
                } else {
                    res.json(data);
                }
            });
    };

    exports.getTransactionsBySaleType = function(req, res, next) {

        var transactionsType = {};

        Transaction.count({ choice: "CREDITO" }, function(err, len) {
            if (err) {
                return next(err);
            } else {
                transactionsType.debito = len;
                Transaction.count(function(err, dataLen) {
                    if (err) {
                        return next(err);
                    } else {
                        transactionsType.credito = dataLen - transactionsType.debito;
                        res.json(transactionsType);
                    }

                });
            }
        });

        /*Transaction.find(function(err, transactions) {
            if (err) {
                return next(err);
            } else {
                var deb = 0,
                    cre = 0;
                for (var i = 0; i < transactions.length; i++) {
                    if (transactions[i].choice == "debito") deb++;
                    else cre++;
                }
                if (cre > 0 || deb > 0) {
                    res.json({ debito: deb, credito: cre });
                } else res.status(400).send("Transactions not found");

            }
        })*/
    };

    exports.getTransactionsByUserId = function(req, res, next) {
        Transaction.find(function(err, transactions) {
            if (err) {
                return next(err);
            } else {
                var userTransactions = [];
                var count = 0;

                for (var i = 0; i < transactions.length; i++) {

                    if (transactions[i].fkUser == req.body.userId) {
                        userTransactions[count] = transactions[i];
                        count++;
                    }
                }

                if (count > 0) {
                    res.json(userTransactions);
                } else res.status(400).send("Transactions not found");
            }

        });
    };
}());
