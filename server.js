'use strict';
const compression = require('compression');
const express = require('express');
const app = express();
const config = require('./config/config.js');
const morgan = require('morgan');
const passport = require('passport');
const router = require('./config/router.js');
const bodyParser = require('body-parser');
require('./config/database')(config);
require('./config/passport')(passport, config);

app.use(compression());
app.use(express.static(config.ROOT + '/app/views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

require('./config/router')(app, config, passport);
app.use(passport.initialize());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
cd
app.listen(config.PORTSERVER, config.IPSERVER, () => {
    console.log('Server Running on ' , config.IPSERVER + ': ' + config.PORTSERVER);
});