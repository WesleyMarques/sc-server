(function() {
    'use strict';

    var express = require('express');
    var router = express.Router();

    var mongoose = require('mongoose');

    var userService = require('../services/user.service');
    
    var User = require('../models/user.model');

    router.get('/getusers', userService.getUsers);

    router.post("/registryUser", userService.newUser);

    router.post("/login", userService.logUser);

    router.post("/setpassword", userService.setPassword);

    router.post("/sendinvoice", userService.sendinvoice);

    router.post("/updateprofile", userService.updateProfile);

    module.exports = router;
}());