var express = require('express');
var app = express();
var db = require('./db');

var UserController = require('./modules/controllers/UserController');
var WalletController = require('./modules/controllers/WalletController');

app.use('/users', UserController);
app.use('/wallets', WalletController);

module.exports = app;