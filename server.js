'use strict';
const express = require('express');
const app = express();
const config = require('./config/config.js');
const morgan = require('morgan');
const router = require('./config/router.js');
const bodyParser = require('body-parser');
require('./config/database')(config);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/api', router);

app.listen(config.PORTSERVER, config.IPSERVER, () => {
    console.log('Server Running on ' , config.IPSERVER + ': ' + config.PORTSERVER);
});
