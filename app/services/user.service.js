(function() {
    'use strict';
    var User = require('../models/user.model');
    var nodemailer = require('../../node_modules/nodemailer');
    var Transaction = require('../models/transaction.model');

    exports.newUser = function(request, response) {
        console.log(request.body);

        var user = new User({
            "fullname": request.body.fullname,
            "cpfcnpj": request.body.cpfcnpj,
            "email": request.body.email,
            "phone": request.body.phone,
            "login": request.body.login,
            "password": request.body.password
        });

        user.save(function(error) {
            if (error) response.status(500).send(error);
            else response.status(200).send("user registered");
        });

    };

    exports.getUsers = function(req, res, next) {
        User.find(function(err, users) {
            if (err) return next(err);
            res.json(users);
        });
    };

    exports.logUser = function(req, res, next) {

        User.find(function(err, users) {
            if (err) return next(err);
            else {
                var user;

                for (var i = 0; i < users.length; i++) {

                    if (users[i].login == req.body.login) {

                        if (users[i].password == req.body.password) {
                            user = users[i];
                            user.id = user._id;

                            res.status(200).send(user);

                            return;
                        }
                    }
                }
                res.status(400).send("user not found");
            }

        });
    };


    exports.sendinvoice = function(req, res, next) {

        var transporter = nodemailer.createTransport('smtps://inpayapp@gmail.com:1ngenico@smtp.gmail.com');

        Transaction.find(function(err, transactions) {

            if (err) return next(err);

            else {
                var userTransaction;

                for (var i = 0; i < transactions.length; i++) {

                    if (transactions[i]._id == req.body.transactionId) {
                        userTransaction = transactions[i];
                    }
                }

                if (userTransaction) {
                    send_invoice(userTransaction, req.body.userMail);
                } else res.status(400).send("Transactions not found");
            }

        });

        function send_invoice(userTransaction, userMail) {
            var mailOptions = {
                from: 'inpayappß@gmail.com', // sender address
                to: userMail, // list of receivers
                subject: 'Nota fiscal', // Subject line
                html: '<html><head></head><body><div style="padding-top: 8px; font-size:30px;background-color: #FFFFCC; margin-top: 5px; margin-left: 8px; text-align: center; height: 80%" >' + '<img src="data:image/png;base64,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">' + '<br><br> Operação:' + userTransaction.choice + '<br> Data: ' + new Date(userTransaction.transactionDate).toLocaleString() + '<br> Total: ' + userTransaction.amount/100 + '<br> Parcelas: ' + userTransaction.portionsNumber + '</div></body></html>' // html body
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);
            });
            res.status(200).send(userMail);
        }

    };

    exports.setPassword = function(req, res, next) {

        var transporter = nodemailer.createTransport('smtps://inpayapp@gmail.com:1ngenico@smtp.gmail.com');

        User.find(function(err, users) {
            if (err) return next(err);
            else {
                var user;

                for (var i = 0; i < users.length; i++) {
                    if (users[i].cpfcnpj == req.body.cpfcnpj) {

                        user = users[i];
                        user.password = Math.floor((Math.random() * 10000));

                        save_user(user);
                        return;
                    }
                }

                res.status(400).send("user not found");
            }

        });


        function save_user(user) {
            return user.save(function(error) {
                if (error) res.status(500).send(error);
                else {
                    var mailOptions = {
                        from: 'inpayappß@gmail.com', // sender address
                        to: user.email, // list of receivers
                        subject: 'Recuperação de senha', // Subject line
                        html: '<b>Olá ' + user.fullname + ', sua senha foi alterada para: ' + user.password + '</b>' // html body
                    };

                    transporter.sendMail(mailOptions, function(error, info) {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message sent: ' + info.response);
                    });
                    res.status(200).send(user.email);
                }
            });
        }
    };

    exports.updateProfile = function(req, res, next) {


        User.find(function(err, users) {
            if (err) return next(err);
            else {
                var user;
                for (var i = 0; i < users.length; i++) {
                    if (users[i]._id == req.body.id) {

                        user = users[i];
                        if (req.body.fullname !== undefined)
                            user.fullname = req.body.fullname;
                        if (req.body.email !== undefined)
                            user.email = req.body.email;
                        if (req.body.phone !== undefined)
                            user.phone = req.body.phone;

                        save_user(user);
                        return;
                    }
                }



                res.status(400).send("user not found");
            }

        });

        function save_user(user) {
            return user.save(function(error) {
                if (error) res.status(500).send(error);
                else {
                    res.status(200).send(user);
                }
            });
        }

    };


}());
